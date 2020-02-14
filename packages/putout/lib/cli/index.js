'use strict';

const {join} = require('path');

const {red} = require('chalk');
const yargsParser = require('yargs-parser');

const merge = require('../merge');
const processFile = require('./process-file');
const getFiles = require('./get-files');
const cacheFiles = require('./cache-files');
const getRulerProcessor = require('./ruler-processor');

const joinDir = (a) => (b) => join(a, b);
const isJS = (a) => /(\.jsx?|\.ts|\/)$/.test(a);
const isString = (a) => typeof a === 'string';
const isStringAll = (...a) => a.filter(isString).length;
const isRuler = (a) => a.disableAll || a.enableAll || isStringAll(a.disable, a.enable);

module.exports = ({argv, halt, log, logError}) => {
    const args = yargsParser(argv, {
        boolean: [
            'cache',
            'version',
            'help',
            'fix',
            'raw',
            'enable-all',
            'disable-all',
            'jsx',
            'flow',
            'added',
            'modified',
            'untracked',
            'options',
        ],
        number: [
            'fixCount',
        ],
        string: [
            'config',
            'format',
            'disable',
            'enable',
            'rulesdir',
        ],
        alias: {
            v: 'version',
            h: 'help',
            c: 'config',
            f: 'format',
            a: 'added',
            m: 'modified',
            u: 'untracked',
        },
        default: {
            fix: false,
            fixCount: 10,
            options: true,
        },
    });
    
    const {
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
        added,
        modified,
        untracked,
    } = args;
    
    const exit = getExit({
        raw,
        halt,
        logError,
    });
    
    const rulerProcessor = getRulerProcessor({
        log,
    });
    
    let gitNames = [];
    
    if (untracked || added || modified)
        gitNames = getGitNames({
            untracked,
            added,
            modified,
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
    
    const globFiles = [
        ...gitNames,
        ...args._.map(String),
    ];
    
    const [e, files] = getFiles(globFiles);
    
    if (e)
        return exit(e);
    
    if (!files.length)
        return exit();
    
    const fileCache = cacheFiles({
        files,
        cache: args.cache,
    });
    
    const options = {
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
        noOptions: !args.options,
    };
    
    const places = files
        .map(processFile(options))
        .filter(Boolean);
    
    const mergedPlaces = merge(...places);
    
    fileCache.reconcile();
    
    if (isRuler(args)) {
        rulerProcessor(args, mergedPlaces);
        return exit();
    }
    
    if (mergedPlaces.length)
        return exit(1);
};

function getGitNames({untracked, added, modified}) {
    const porcelaine = require('@putout/git-status-porcelain');
    const findUp = require('find-up');
    
    const gitDir = findUp.sync('.git', {
        type: 'directory',
    }).replace(/\.git$/, '');
    
    if (!gitDir)
        return [];
    
    const names = porcelaine({
        untracked,
        added,
        modified,
    });
    
    return names
        .filter(isJS)
        .map(joinDir(gitDir));
}

const getExit = ({halt, raw, logError}) => (e) => {
    if (!e)
        return halt(0);
    
    if (typeof e === 'number')
        return halt(e);
    
    if (raw)
        logError(e);
    else
        logError(red(e.message));
    
    halt(1);
};

