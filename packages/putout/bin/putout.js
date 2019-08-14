#!/usr/bin/env node

'use strict';

const {
    readFileSync,
    writeFileSync,
    statSync,
} = require('fs');

const {red} = require('chalk');

const cwd = process.cwd();

const glob = require('glob');
const tryCatch = require('try-catch');
const merge = require('../lib/merge');
const processFile = require('../lib/process-file');

const {parse, stringify} = JSON;

const one = (f) => (a) => f(a);

const argv = require('yargs-parser')(process.argv.slice(2), {
    boolean: [
        'version',
        'help',
        'fix',
        'raw',
        'enable-all',
        'disable-all',
        'jsx',
        'flow',
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
    },
    default: {
        fix: false,
        fixCount: 10,
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
} = argv;

if (argv.version) {
    console.log(`v${require('../package.json').version}`);
    exit();
}

if (argv.help) {
    help();
    exit();
}

const isString = (a) => typeof a === 'string';
const isStringAll = (...a) => a.filter(isString).length;
const isRuler = (a) => a.disableAll || a.enableAll || isStringAll(a.disable, a.enable);

const mergeArrays = (a) => [].concat(...a);

const [e, files] = tryCatch(getFiles, argv._.map(String));

if (e)
    exit(e);

const options = {
    fix,
    rulesdir,
    format,
    isFlow,
    isJSX,
    fixCount,
};

const places = files
    .map(processFile(options))
    .filter(Boolean);

const mergedPlaces = merge(...places);

if (isRuler(argv)) {
    rulerProcessor(argv, mergedPlaces);
    exit();
}

if (mergedPlaces.length)
    exit(1);

function addExt(a) {
    const [e, file] = tryCatch(statSync, a);
    
    if (e)
        return a;
    
    const isDir = file.isDirectory();
    
    if (isDir)
        return `${a}/**/*.{js,jsx,ts}`;
    
    return a;
}

function getFiles(args) {
    const files = args
        .map(addExt)
        .map(one(glob.sync));
    
    if (args.length && !files[0].length)
        throw Error(`No files matching the pattern "${args[0]}" were found`);
    
    return mergeArrays(files);
}

function help() {
    const bin = require('../help');
    const usage = 'Usage: putout [options] [path]';
    
    console.log(usage);
    console.log('Options:');
    
    for (const name of Object.keys(bin)) {
        console.log('  %s %s', name, bin[name]);
    }
}

function exit(e) {
    if (!e)
        process.exit(0);
    
    if (typeof e === 'number')
        return process.exit(e);
    
    if (raw)
        console.error(e);
    else
        console.error(red(e.message));
    
    process.exit(1);
}

function rulerProcessor({disable, disableAll, enable, enableAll}, mergedPlaces) {
    const name = `${cwd}/.putout.json`;
    const defaultData = stringify({
        rules: {},
    });
    
    const [, data = defaultData] = tryCatch(readFileSync, name, 'utf8');
    const ruler = require('../lib/ruler');
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
        return console.log(object.rules);
    
    if (isString(enable) && !enable)
        return console.log(object.rules);
    
    writeFileSync(name, stringify(updated, null, 4));
}

