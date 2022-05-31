'use strict';

const tryToCatch = require('try-to-catch');

const yargsParser = require('yargs-parser');
const {isCI} = require('ci-info');
const memo = require('nano-memoize');
const tryCatch = require('try-catch');
const wraptile = require('wraptile');
const fullstore = require('fullstore');

const keyPress = require('@putout/cli-keypress');
const {version} = require('../../package.json');
const {simpleImport} = require('./simple-import');
const {run} = require('./runner/runner.js');

const {
    getFilePatterns,
    getProcessorRunners,
    defaultProcessors,
} = require('@putout/engine-processor');

const getFiles = require('./get-files');
const {createCache} = require('@putout/cli-cache');
const supportedFiles = require('./supported-files');
const getFormatter = memo(require('./formatter').getFormatter);
const getOptions = require('./get-options');

const validateArgs = require('@putout/cli-validate-args');

const {
    OK,
    PLACE,
    STAGE,
    NO_FILES,
    CANNOT_LOAD_PROCESSOR,
    WAS_STOP,
    INVALID_OPTION,
    UNHANDLED,
    RULLER_WITH_FIX,
    RULLER_NO_FILES,
    INVALID_CONFIG,
} = require('./exit-codes');

const cwd = process.cwd();
const {PUTOUT_FILES = ''} = process.env;
const envNames = !PUTOUT_FILES ? [] : PUTOUT_FILES.split(',');

const maybeFirst = (a) => isArray(a) ? a.pop() : a;
const maybeArray = (a) => isArray(a) ? a : a.split(',');
const getExitCode = (wasStop) => wasStop() ? WAS_STOP : OK;

const isStr = (a) => typeof a === 'string';
const {isArray} = Array;

module.exports = async ({argv, halt, log, write, logError, readFile, writeFile}) => {
    const {isStop} = keyPress();
    const wasStop = fullstore();
    
    const argvConfig = {
        configuration: {
            'strip-aliased': true,
            'strip-dashed': true,
        },
        coerce: {
            format: maybeFirst,
            plugins: maybeArray,
        },
        boolean: [
            'ci',
            'cache',
            'version',
            'help',
            'fix',
            'fresh',
            'raw',
            'enable-all',
            'disable-all',
            'flow',
            'config',
            'staged',
        ],
        number: [
            'fix-count',
        ],
        string: [
            'format',
            'disable',
            'enable',
            'rulesdir',
            'transform',
            'plugins',
            'match',
        ],
        alias: {
            version: 'v',
            help: 'h',
            format: 'f',
            staged: 's',
            transform: 't',
        },
        default: {
            ci: true,
            fix: false,
            fixCount: 10,
            config: true,
            cache: true,
            fresh: false,
            enable: '',
            disable: '',
            disableAll: false,
            enableAll: false,
            plugins: [],
        },
    };
    
    const args = yargsParser(argv, argvConfig);
    
    if (args.ci && isCI) {
        args.format = 'stream';
        args.cache = false;
    }
    
    const {
        fix,
        fixCount,
        raw,
        rulesdir,
        format,
        flow: isFlow,
        disable,
        disableAll,
        enable,
        enableAll,
        staged,
        fresh,
        cache,
        transform,
        plugins,
    } = args;
    
    const {red} = await simpleImport('chalk');
    const exit = getExit({
        red,
        raw,
        halt,
        logError,
    });
    
    addOnce(process, 'unhandledRejection', wraptile(exit, UNHANDLED));
    
    const optionsList = [
        ...argvConfig.boolean,
        ...argvConfig.string,
        ...argvConfig.number,
    ];
    
    const validationError = await validateArgs(args, optionsList);
    
    if (validationError)
        return exit(INVALID_OPTION, validationError);
    
    if (args.version) {
        log(`v${version}`);
        return exit();
    }
    
    if (args.help) {
        const help = require('./help');
        log(help());
        return exit();
    }
    
    if (isStr(args.match)) {
        const {match, matchErrors} = await simpleImport('@putout/cli-match');
        const code = await match({
            pattern: args.match,
            cwd,
            readFile,
            writeFile,
        });
        
        return exit(code, `--match: ${matchErrors[code]}`);
    }
    
    if (fix && (enable || disable || enableAll || disableAll))
        return exit(RULLER_WITH_FIX, Error(`'--fix' cannot be used with ruler toggler ('--enable', '--disable')`));
    
    if (enable || disable) {
        const {ruler} = await simpleImport('@putout/cli-ruler');
        ruler({enable, disable, readFile, writeFile}, []);
    }
    
    const noConfig = !args.config;
    const [configError, config] = tryCatch(getOptions, {
        name: `${cwd}/*`,
        rulesdir,
        noConfig,
        transform,
        plugins,
    });
    
    if (configError)
        return exit(INVALID_CONFIG, configError);
    
    const {
        formatter,
        ignore,
        processors = defaultProcessors,
    } = config;
    
    const [currentFormat, formatterOptions] = await getFormatter(format || formatter, exit);
    const [error, processorRunners] = await tryToCatch(getProcessorRunners, processors, simpleImport);
    
    if (error)
        return exit(CANNOT_LOAD_PROCESSOR, error);
    
    const patterns = getFilePatterns(processorRunners);
    
    supportedFiles.add(patterns);
    
    const stagedNames = [];
    
    if (staged) {
        const {get} = require('./staged');
        const {findUp} = await simpleImport('find-up');
        const names = await get({findUp});
        
        stagedNames.push(...names);
    }
    
    const globFiles = [
        ...stagedNames,
        ...args._.map(String),
        ...envNames,
    ];
    
    const [e, names] = await getFiles(globFiles, {
        ignore,
    });
    
    if (e)
        return exit(NO_FILES, e);
    
    const noFiles = !names.length;
    
    if (noFiles && (enableAll || disableAll))
        return exit(RULLER_NO_FILES, Error('`path` is missing for ruler toggler (`--enable-all`, `--disable-all`)'));
    
    if (noFiles)
        return exit();
    
    const fileCache = await createCache({
        version,
        cache,
        fresh,
    });
    
    const options = {
        fix,
        isFlow,
        fixCount,
        raw,
        ruler: {
            disable,
            disableAll,
            enable,
            enableAll,
        },
        
        log,
        logError,
        write,
        transform,
        plugins,
    };
    
    const {places, exited} = await run({
        fix,
        exit,
        readFile,
        writeFile,
        raw,
        rulesdir,
        names,
        options,
        fileCache,
        currentFormat,
        formatterOptions,
        write,
        log,
        isStop,
        wasStop,
        noConfig,
        plugins,
        transform,
    });
    
    if (exited)
        return;
    
    fileCache.reconcile();
    
    if (enableAll || disableAll) {
        const {ruler} = await simpleImport('@putout/cli-ruler');
        await ruler({enableAll, disableAll, readFile, writeFile}, places);
    }
    
    if (fix && staged) {
        const {set} = require('./staged');
        const {findUp} = await simpleImport('find-up');
        const stagedNames = await set({findUp});
        
        if (!stagedNames.length)
            return exit(STAGE);
    }
    
    if (places.length)
        return exit(PLACE);
    
    const exitCode = getExitCode(wasStop);
    
    exit(exitCode);
};

const getExit = ({red, halt, raw, logError}) => (code, e) => {
    if (!code)
        return halt(0);
    
    if (!e)
        return halt(code);
    
    const message = raw ? e : red(`🐊 ${e.message || e}`);
    
    logError(message);
    halt(code);
    
    return {
        exited: true,
    };
};

module.exports._addOnce = addOnce;
function addOnce(emitter, name, fn) {
    if (!emitter.listenerCount(name))
        emitter.on(name, fn);
}

