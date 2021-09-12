'use strict';

const {resolve} = require('path');
const {readFileSync} = require('fs');

const {red} = require('chalk');
const yargsParser = require('yargs-parser');
const {isCI} = require('ci-info');
const memo = require('nano-memoize');
const fullstore = require('fullstore');
const tryCatch = require('try-catch');
const tryToCatch = require('try-to-catch');
const wraptile = require('wraptile');
const {createSimport} = require('simport');

const simport = createSimport(__filename);

const {
    runProcessors,
    getFilePatterns,
    getProcessorRunners,
    defaultProcessors,
} = require('@putout/engine-processor');

const merge = require('../merge');
const ignores = require('../ignores');

const initProcessFile = require('./process-file');
const getFiles = require('./get-files');
const cacheFiles = require('./cache-files');
const supportedFiles = require('./supported-files');
const getFormatter = memo(require('./formatter').getFormatter);
const getOptions = require('./get-options');
const report = require('./report')();
const keyPress = require('@putout/cli-keypress');
const validateArgs = require('@putout/cli-validate-args');
const parseError = require('./parse-error');

const {
    OK,
    PLACE,
    STAGE,
    NO_FILES,
    NO_PROCESSORS,
    CANNOT_LOAD_PROCESSOR,
    WAS_STOP,
    INVALID_OPTION,
    UNHANDLED,
    RULLER_WITH_FIX,
    RULLER_NO_FILES,
} = require('./exit-codes');

const cwd = process.cwd();
const {PUTOUT_FILES = ''} = process.env;
const envNames = !PUTOUT_FILES ? [] : PUTOUT_FILES.split(',');

const maybeFirst = (a) => isArray(a) ? a.pop() : a;
const maybeArray = (a) => isArray(a) ? a : a.split(',');
const getExitCode = (wasStop) => wasStop() ? WAS_STOP : OK;

const isStr = (a) => typeof a === 'string';
const {isArray} = Array;
const isParser = (rule) => /^parser/.test(rule);
const isParsingError = ({rule}) => isParser(rule);

const createFormatterProxy = (options) => {
    return new Proxy(options, {
        get(target, name) {
            if (target[name])
                return target[name];
            
            if (name === 'source')
                return readFileSync(target.name, 'utf8');
        },
    });
};

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
        args.format = 'dump';
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
    
    const exit = getExit({
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
        const {version} = require('../../package.json');
        log(`v${version}`);
        return exit();
    }
    
    if (args.help) {
        const help = require('./help');
        log(help());
        return exit();
    }
    
    if (isStr(args.match)) {
        const {match, matchErrors} = await import('@putout/cli-match');
        const code = await match({
            pattern: args.match,
            cwd,
            readFile,
            writeFile,
        });
        
        return exit(code, `--match: ${matchErrors[code]}`);
    }
    
    if (fix && (enable || disable || enableAll || disableAll))
        return exit(RULLER_WITH_FIX, Error('`--fix` cannot be used with ruler toggler (`--enable`, `--disable`)'));
    
    if (enable || disable) {
        const rulerProcessor = await simport('@putout/cli-ruler');
        rulerProcessor({enable, disable, readFile, writeFile}, []);
    }
    
    const noConfig = !args.config;
    const {
        formatter,
        ignore,
        processors = defaultProcessors,
    } = getOptions({
        name: `${cwd}/*`,
        rulesdir,
        noConfig,
        transform,
        plugins,
    });
    
    const [currentFormat, formatterOptions] = getFormatter(format || formatter, exit);
    const [error, processorRunners] = tryCatch(getProcessorRunners, processors);
    
    if (error)
        return exit(CANNOT_LOAD_PROCESSOR, error);
    
    const patterns = getFilePatterns(processorRunners);
    
    supportedFiles.add(patterns);
    
    const stagedNames = [];
    
    if (staged) {
        const {get} = require('./staged');
        const {findUp} = await import('find-up');
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
    
    const fileCache = await cacheFiles({
        cache,
        fresh,
    });
    
    const options = {
        fix,
        fileCache,
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
    
    const rawPlaces = [];
    
    const processFile = initProcessFile(options);
    const {length} = names;
    
    for (let index = 0; index < length; index++) {
        if (wasStop())
            break;
        
        wasStop(isStop());
        
        const currentIndex = isStop() ? length - 1 : index;
        const name = names[index];
        const resolvedName = resolve(name)
            .replace(/^\./, cwd);
        
        const options = getOptions({
            name: resolvedName,
            rulesdir,
            noConfig,
            transform,
            plugins,
        });
        
        const {dir} = options;
        
        if (fileCache.canUseCache({options, name})) {
            const places = fileCache.getPlaces(name);
            const formatterProxy = createFormatterProxy({
                report,
                formatterOptions,
                name,
                places,
                index: currentIndex,
                count: length,
            });
            
            const line = report(currentFormat, formatterProxy);
            
            write(line || '');
            rawPlaces.push(places);
            continue;
        }
        
        let isProcessed = true;
        let places = [];
        let rawSource = '';
        let processedSource = '';
        
        if (!ignores(dir, resolvedName, options)) {
            rawSource = await readFile(resolvedName, 'utf8');
            
            const [error, result] = await tryToCatch(runProcessors, {
                name: resolvedName,
                fix,
                processFile,
                options,
                rawSource,
                processorRunners,
            });
            
            if (error) {
                places = parseError(error);
                
                isProcessed = true;
                processedSource = rawSource;
                
                if (raw)
                    log(error);
            } else {
                ({
                    isProcessed,
                    places,
                    processedSource,
                } = result);
            }
        }
        
        const line = report(currentFormat, {
            report,
            formatterOptions,
            name,
            source: rawSource,
            places,
            index: currentIndex,
            count: length,
        });
        
        write(line || '');
        
        if (!isProcessed)
            return exit(NO_PROCESSORS, Error(`No processors found for ${name}`));
        
        if (rawSource !== processedSource) {
            fileCache.removeEntry(name);
            await writeFile(name, processedSource);
        }
        
        const fixable = !places.filter(isParsingError).length;
        
        if (fixable)
            fileCache.setInfo(name, places, options);
        
        rawPlaces.push(places);
    }
    
    const mergedPlaces = merge(...rawPlaces);
    
    fileCache.reconcile();
    
    if (enableAll || disableAll) {
        const rulerProcessor = await simport('@putout/cli-ruler');
        await rulerProcessor({enableAll, disableAll, readFile, writeFile}, mergedPlaces);
    }
    
    if (fix && staged) {
        const {set} = require('./staged');
        const {findUp} = await import('find-up');
        const stagedNames = await set({findUp});
        
        if (!stagedNames.length)
            return exit(STAGE);
    }
    
    if (mergedPlaces.length)
        return exit(PLACE);
    
    const exitCode = getExitCode(wasStop);
    
    exit(exitCode);
};

const getExit = ({halt, raw, logError}) => (code, e) => {
    if (!code)
        return halt(0);
    
    if (!e)
        return halt(code);
    
    const message = raw ? e : red(e.message || e);
    
    logError(message);
    halt(code);
};

module.exports._addOnce = addOnce;
function addOnce(emitter, name, fn) {
    if (!emitter.listenerCount(name))
        emitter.on(name, fn);
}

