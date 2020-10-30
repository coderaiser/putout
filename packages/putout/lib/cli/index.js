'use strict';

const {resolve} = require('path');

const {red} = require('chalk');
const yargsParser = require('yargs-parser');
const {isCI} = require('ci-info');

const merge = require('../merge');
const processFile = require('./process-file');
const getFiles = require('./get-files');
const cacheFiles = require('./cache-files');
const supportedFiles = require('./supported-files');
const {
    PLACE,
    STAGE,
} = require('./exit-codes');

const cwd = process.cwd();
const {PUTOUT_FILES = ''} = process.env;
const envNames = !PUTOUT_FILES ? [] : PUTOUT_FILES.split(',');

const {isArray} = Array;
const maybeFirst = (a) => isArray(a) ? a.pop() : a;
const plugins = (a) => isArray(a) ? a : a.split(',');

module.exports = async ({argv, halt, log, write, logError, readFile, writeFile}) => {
    const args = yargsParser(argv, {
        coerce: {
            format: maybeFirst,
            plugins,
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
    
    supportedFiles.add(args.ext);
    
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
    
    const [e, names] = await getFiles(globFiles);
    
    if (e)
        return exit(e);
    
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
        rulesdir,
        format,
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
        
        exit,
        log,
        logError,
        write,
        transform,
        noConfig: !args.config,
        plugins: args.plugins,
    };
    
    const rawPlaces = [];
    
    const process = processFile(options);
    const {length} = names;
    
    for (let index = 0; index < length; index++) {
        const name = names[index];
        const resolvedName = resolve(name)
            .replace(/^\./, cwd);
        
        const source = await readFile(resolvedName, 'utf8');
        const {places, code} = await process({
            name: resolvedName,
            source,
            index,
            length,
        });
        
        if (fix && source !== code)
            await writeFile(name, code);
        
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

const getExit = ({halt, raw, logError}) => (e) => {
    if (!e)
        return halt(0);
    
    if (typeof e === 'number')
        return halt(e);
    
    const message = raw ? e : red(e.message);
    
    logError(message);
    halt(1);
};

