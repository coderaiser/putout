'use strict';

const {resolve} = require('path');
const {readFileSync} = require('fs');

const {red} = require('chalk');
const yargsParser = require('yargs-parser');
const {isCI} = require('ci-info');
const memo = require('nano-memoize');
const fullstore = require('fullstore');

const {loadProcessors} = require('@putout/engine-loader');
const {
    runProcessors,
    getFilePatterns,
    defaultProcessors,
} = require('@putout/engine-processor');

const merge = require('../merge');
const ignores = require('../ignores');

const processFile = require('./process-file');
const getFiles = require('./get-files');
const cacheFiles = require('./cache-files');
const supportedFiles = require('./supported-files');
const getFormatter = memo(require('./formatter').getFormatter);
const getOptions = require('./get-options');
const report = require('./report')();
const onHalt = require('./on-halt');
const validateArgs = require('./validate-args');

const {
    OK,
    PLACE,
    STAGE,
    NO_FILES,
    NO_PROCESSORS,
    WAS_STOP,
    INVALID_OPTION,
} = require('./exit-codes');

const cwd = process.cwd();
const {PUTOUT_FILES = ''} = process.env;
const envNames = !PUTOUT_FILES ? [] : PUTOUT_FILES.split(',');

const maybeFirst = (a) => isArray(a) ? a.pop() : a;
const maybeArray = (a) => isArray(a) ? a : a.split(',');
const getExitCode = (wasStop) => wasStop() ? WAS_STOP : OK;

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
    const {isStop} = onHalt();
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
            'debug',
            'version',
            'help',
            'fix',
            'fresh',
            'raw',
            'enable-all',
            'disable-all',
            'jsx',
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
            debug: false,
            plugins: [],
        },
    };
    
    const args = yargsParser(argv, argvConfig);
    
    if (args.ci && isCI) {
        args.format = 'dump';
        args.cache = false;
    }
    
    const {
        debug,
        fix,
        fixCount,
        raw,
        rulesdir,
        format,
        flow: isFlow,
        jsx: isJSX,
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
    
    const invalidOption = validateArgs(args, argvConfig, exit);
    
    if (invalidOption)
        return exit(INVALID_OPTION, Error(`Invalid option '${invalidOption}'`));
    
    if (args.version) {
        log(`v${require('../../package.json').version}`);
        return exit();
    }
    
    if (args.help) {
        const help = require('./help');
        log(help());
        return exit();
    }
    
    if (enable || disable) {
        const rulerProcessor = require('./ruler-processor');
        rulerProcessor({enable, disable}, []);
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
    
    const loadedProcessors = loadProcessors({processors});
    const patterns = getFilePatterns(loadedProcessors);
    
    supportedFiles.add(patterns);
    
    const stagedNames = [];
    
    if (staged) {
        const {get} = require('./staged');
        const names = await get();
        
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
    
    if (!names.length)
        return exit();
    
    const fileCache = await cacheFiles({
        cache,
        fresh,
    });
    
    const options = {
        debug,
        fix,
        fileCache,
        isFlow,
        isJSX,
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
    
    const process = processFile(options);
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
        
        if (fileCache.canUseCache({fix, options, name})) {
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
            
            ({
                isProcessed,
                places,
                processedSource,
            } = await runProcessors({
                name: resolvedName,
                fix,
                processFile: process,
                options,
                rawSource,
            }));
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
        
        if (fix && rawSource !== processedSource) {
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
        const rulerProcessor = require('./ruler-processor');
        rulerProcessor({enableAll, disableAll}, mergedPlaces);
        return exit();
    }
    
    if (fix && staged) {
        const {set} = require('./staged');
        const stagedNames = await set();
        
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
    
    const message = raw ? e : red(e.message);
    
    logError(message);
    halt(code);
};

