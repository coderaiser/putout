'use strict';

const {join} = require('path');
const {
    readFileSync,
    writeFileSync,
} = require('fs');

const {red} = require('chalk');
const yargsParser = require('yargs-parser');
const tryCatch = require('try-catch');

const merge = require('../merge');
const processFile = require('./process-file');
const getFiles = require('./get-files');
const cacheFiles = require('./cache-files');

const joinDir = (a) => (b) => join(a, b);
const isJS = (a) => /(\.jsx?|\.ts|\/)$/.test(a);
const isString = (a) => typeof a === 'string';
const isStringAll = (...a) => a.filter(isString).length;

const {parse, stringify} = JSON;
const {cwd} = process;

module.exports = ({argv, halt, write, writeError}) => {
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
        writeError,
    });
    
    const rulerProcessor = getRulerProcessor({
        write,
    });
    
    let gitNames = [];
    
    if (untracked || added || modified)
        gitNames = getGitNames({
            untracked,
            added,
            modified,
        });
    
    if (args.version) {
        write(`v${require('../../package.json').version}`);
        return exit();
    }
    
    if (args.help) {
        const help = require('./help');
        write(help());
        return exit();
    }
    
    const isRuler = (a) => a.disableAll || a.enableAll || isStringAll(a.disable, a.enable);
    
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
        console,
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

const getRulerProcessor = ({write}) => ({disable, disableAll, enable, enableAll}, mergedPlaces) => {
    const name = `${cwd}/.putout.json`;
    const defaultData = stringify({
        rules: {},
    });
    
    const [, data = defaultData] = tryCatch(readFileSync, name, 'utf8');
    const ruler = require('./ruler');
    const object = parse(data);
    
    let updated;
    
    if (enable)
        updated = ruler.enable(object, enable);
    else if (disable)
        updated = ruler.disable(object, disable);
    else if (enableAll)
        updated = ruler.enableAll(object, mergedPlaces);
    else if (disableAll)
        updated = ruler.disableAll(object, mergedPlaces);
    
    if (isString(disable) && !disable)
        return write(object.rules);
    
    if (isString(enable) && !enable)
        return write(object.rules);
    
    writeFileSync(name, stringify(updated, null, 4));
};

const getExit = ({halt, raw, writeError}) => (e) => {
    if (!e)
        return halt(0);
    
    if (typeof e === 'number')
        return halt(e);
    
    if (raw)
        writeError(e);
    else
        writeError(red(e.message));
    
    halt(1);
};

