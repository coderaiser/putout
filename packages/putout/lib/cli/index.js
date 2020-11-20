'use strict';

const {resolve} = require('path');
const {readFileSync} = require('fs');

const {red} = require('chalk');
const yargsParser = require('yargs-parser');
const {isCI} = require('ci-info');
const memo = require('nano-memoize');

const {loadProcessors} = require('@putout/engine-loader');
const {
    runProcessors,
    getExtensions,
    defaultProcessors,
} = require('@putout/engine-processor');

const merge = require('../merge');
const processFile = require('./process-file');
const getFiles = require('./get-files');
const cacheFiles = require('./cache-files');
const supportedFiles = require('./supported-files');
const getFormatter = memo(require('./formatter').getFormatter);
const getOptions = require('./get-options');
const report = require('./report')();

const {
    PLACE,
    STAGE,
    NO_FILES,
    NO_PROCESSORS,
} = require('./exit-codes');

const cwd = process.cwd();
const {PUTOUT_FILES = ''} = process.env;
const envNames = !PUTOUT_FILES ? [] : PUTOUT_FILES.split(',');

const {isArray} = Array;
const maybeFirst = (a) => isArray(a) ? a.pop() : a;
const maybeArray = (a) => isArray(a) ? a : a.split(',');
const isCrash = (rule) => /^crash/.test(rule);
const isParsingError = ({rule}) => isCrash(rule);

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
    const args = yargsParser(argv, {
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
            'fixCount',
        ],
        string: [
            'ext',
            'format',
            'disable',
            'enable',
            'rulesdir',
            'transform',
            'plugins',
        ],
        alias: {
            v: 'version',
            h: 'help',
            f: 'format',
            s: 'staged',
            t: 'transform',
            d: 'debug',
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
    });
    
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
    const {ignore, processors = defaultProcessors} = getOptions({
        name: `${cwd}/*`,
        rulesdir,
        noConfig,
        transform,
        plugins,
    });
    
    const loadedProcessors = loadProcessors({processors});
    const extensions = getExtensions(loadedProcessors);
    
    supportedFiles.add(extensions);
    supportedFiles.add(args.ext);
    
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
        
        const {formatter} = options;
        const [currentFormat, formatterOptions] = getFormatter(format || formatter, exit);
        
        if (fileCache.canUseCache({fix, options, name})) {
            const places = fileCache.getPlaces(name);
            const formatterProxy = createFormatterProxy({
                report,
                formatterOptions,
                name,
                places,
                index,
                count: length,
            });
            
            const line = report(currentFormat, formatterProxy);
            
            write(line || '');
            rawPlaces.push(places);
            continue;
        }
        
        const rawSource = await readFile(resolvedName, 'utf8');
        
        const {
            isProcessed,
            places,
            processedSource,
        } = await runProcessors({
            name: resolvedName,
            fix,
            processFile: process,
            options,
            rawSource,
            index,
            length,
        });
        
        const line = report(currentFormat, {
            report,
            formatterOptions,
            name,
            source: rawSource,
            places,
            index,
            count: length,
        });
        
        write(line || '');
        
        if (!isProcessed)
            exit(NO_PROCESSORS, Error(`No processors found for ${name}`));
        
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
            exit(STAGE);
    }
    
    if (mergedPlaces.length)
        return exit(PLACE);
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

