'use strict';

const process = require('node:process');
const tryToCatch = require('try-to-catch');

const {isCI} = require('ci-info');
const {nanomemoize} = require('nano-memoize');
const tryCatch = require('try-catch');
const wraptile = require('wraptile');
const fullstore = require('fullstore');

const {
    getFilePatterns,
    getProcessorRunners,
    defaultProcessors,
} = require('@putout/engine-processor');

const keyPress = require('@putout/cli-keypress');

const supportedFiles = require('./supported-files');
const getOptions = require('./get-options');
const {argvConfig, parseArgs} = require('./parse-args');

const getFiles = require('./get-files');
const {version, dependencies} = require('../../package.json');
const {formatter: defaultFormatter} = require('../../putout.json');
const {simpleImport} = require('./simple-import');
const {run} = require('./runner/runner.js');

const {
    OK,
    PLACE,
    STAGE,
    NO_FILES,
    CANNOT_LOAD_PROCESSOR,
    WAS_STOP,
    INVALID_OPTION,
    UNHANDLED,
    RULER_WITH_FIX,
    RULER_NO_FILES,
    INVALID_CONFIG,
    CANNOT_LINT_STAGED,
    INTERACTIVE_CANCELED,
} = require('./exit-codes');

const noop = () => {};
const {keys} = Object;
const {isSupported} = supportedFiles;
const getFormatter = nanomemoize(require('@putout/engine-reporter/formatter').getFormatter);

const cwd = process.cwd();
const {PUTOUT_FILES = ''} = process.env;
const envNames = !PUTOUT_FILES ? [] : PUTOUT_FILES.split(',');

const getExitCode = (wasStop) => wasStop() ? WAS_STOP : OK;
const isStr = (a) => typeof a === 'string';
const isNoop = (a) => String(a) === String(noop);

const parseIsStop = (passedIsStop) => {
    if (!isNoop(passedIsStop))
        return passedIsStop;
    
    const {isStop} = keyPress();
    
    return isStop;
};

module.exports = async ({argv, halt, log, write, logError, readFile, writeFile, trace = noop, isStop = noop}) => {
    isStop = parseIsStop(isStop);
    trace('start');
    
    const wasStop = fullstore();
    const args = parseArgs(argv);
    
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
    
    const {createExit} = await simpleImport('./exit.mjs');
    
    const exit = createExit({
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
    
    const {validateArgs} = await import('@putout/cli-validate-args');
    const validationError = await validateArgs(args, optionsList);
    
    if (validationError)
        return exit(INVALID_OPTION, validationError);
    
    if (args.version) {
        log(`v${version}`);
        return exit();
    }
    
    let newFormatter;
    
    if (args.interactive) {
        const {chooseFormatter} = await simpleImport('@putout/cli-choose-formatter');
        
        [newFormatter] = await chooseFormatter(defaultFormatter, keys(dependencies));
        
        if (!newFormatter)
            return exit(INTERACTIVE_CANCELED);
    }
    
    if (args.help) {
        const help = require('./help');
        log(help());
        
        return exit();
    }
    
    if (isStr(args.match)) {
        const {match} = await simpleImport('@putout/cli-match');
        const {code, message} = await match({
            pattern: args.match,
            cwd,
            readFile,
            writeFile,
        });
        
        return exit(code, `--match: ${message}`);
    }
    
    if (fix && (enable || disable || enableAll || disableAll))
        return exit(RULER_WITH_FIX, Error(`'--fix' cannot be used with ruler toggler ('--enable', '--disable')`));
    
    if (enable || disable) {
        const {ruler} = await simpleImport('@putout/cli-ruler');
        
        ruler([], {
            enable,
            disable,
            readFile,
            writeFile,
        });
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
    
    const [currentFormat, formatterOptions] = await getFormatter(newFormatter || format || formatter, exit);
    const [error, processorRunners] = await tryToCatch(getProcessorRunners, processors, simpleImport);
    
    if (error)
        return exit(CANNOT_LOAD_PROCESSOR, error);
    
    const patterns = getFilePatterns(processorRunners);
    
    supportedFiles.add(patterns);
    
    const stagedNames = [];
    
    if (staged) {
        const {get} = require('@putout/cli-staged');
        const {findUp} = await simpleImport('find-up');
        
        const [error, names] = await tryToCatch(get, {
            findUp,
            isSupported,
        });
        
        if (error)
            return exit(CANNOT_LINT_STAGED, `--staged: ${error.message}`);
        
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
        return exit(RULER_NO_FILES, Error('`path` is missing for ruler toggler (`--enable-all`, `--disable-all`)'));
    
    if (noFiles)
        return exit();
    
    const {createCache} = await simpleImport('@putout/cli-cache');
    
    const fileCache = await createCache({
        version,
        cache,
        fresh,
    });
    
    const options = {
        fix,
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
        processorRunners,
        trace,
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
        
        await ruler(places, {
            enableAll,
            disableAll,
            readFile,
            writeFile,
        });
    }
    
    if (fix && staged) {
        const {set} = require('@putout/cli-staged');
        const {findUp} = await simpleImport('find-up');
        
        const stagedNames = await set({
            findUp,
        });
        
        if (!stagedNames.length)
            return exit(STAGE);
    }
    
    if (places.length)
        return exit(PLACE);
    
    const exitCode = getExitCode(wasStop);
    
    exit(exitCode);
};

module.exports._addOnce = addOnce;
function addOnce(emitter, name, fn) {
    if (!emitter.listenerCount(name))
        emitter.on(name, fn);
}
