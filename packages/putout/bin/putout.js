#!/usr/bin/env node

'use strict';

const {resolve} = require('path');

const {
    readFileSync,
    writeFileSync,
    readdirSync,
    statSync,
} = require('fs');

const {
    underline,
    red,
    grey,
} = require('chalk');

const cwd = process.cwd();

const once = require('once');
const glob = require('glob');
const tryCatch = require('try-catch');

const defaultOptions = require('../putout.json');

const putout = require('..');
const {
    merge,
    ignores,
    parseMatch,
} = putout;

const report = require('../lib/report')();
const getOptions = require('../lib/get-options');

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
    raw,
    fixCount,
    rulesdir,
} = argv;

if (argv.version) {
    console.log(`v${require('../package.json').version}`);
    process.exit();
}

if (argv.help) {
    help();
    process.exit();
}

const [e, files] = tryCatch(getFiles, argv._.map(String));

if (e)
    exit(e);

const places = files
    .map(processFiles)
    .filter(Boolean);

const isString = (a) => typeof a === 'string';
const isStringAll = (...a) => a.filter(isString).length;
const isRuler = (a) => a.disableAll || a.enableAll || isStringAll(a.disable, a.enable);
const mergedPlaces = Array.from(merge(...places));

if (isRuler(argv)) {
    return rulerProcessor(argv, mergedPlaces);
}

if (mergedPlaces.length)
    process.exit(1);

function processFiles(name, index, {length}) {
    const resolvedName = resolve(name)
        .replace(/^\./, cwd);
    
    const [dirOpt, options] = getOptions({
        rulesdir,
    });
    
    const {match, formatter} = options;
    const format = getFormatter(argv.format || formatter);
    
    if (ignores(dirOpt, resolvedName, options)) {
        const line = report(format, {
            name: resolvedName,
            places: [],
            index,
            count: length,
            source: '',
        });
        
        process.stdout.write(line || '');
        return null;
    }
    
    const input = readFileSync(name, 'utf8');
    const isTS = /\.ts$/.test(name);
    const isFlow = argv.flow;
    const isJSX = argv.jsx;
    
    const [e, result] = tryCatch(putout, input, {
        fix,
        fixCount,
        isTS,
        isFlow,
        isJSX,
        ...merge(
            options,
            parseMatch(match, resolvedName)
        ),
    });
    
    if (e) {
        console.error(underline(resolvedName));
        const {
            line,
            column,
        } = e.position || {
            line: 'x',
            column: 'x',
        };
        
        e.message = `${grey(`${line}:${column}`)} ${red(e.message)}`;
        console.log(raw ? e : e.message);
        return null;
    }
    
    const {code, places} = result;
    
    if (argv.disable || argv.enable || argv.disableAll || argv.enableAll)
        return places;
    
    if (fix && input !== code)
        return writeFileSync(name, code);
    
    const line = report(format, {
        name: resolvedName,
        places,
        index,
        count: length,
        source: input,
    });
    
    process.stdout.write(line || '');
    
    return places;
}

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
    
    return [].concat(...files);
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
        process.exit(1);
    
    if (raw)
        console.error(e);
    else
        console.error(red(e.message));
    
    process.exit(1);
}

function getFormatter(name) {
    let e;
    let reporter;
    
    [e, reporter] = tryCatch(require, `@putout/formatter-${name}`);
    
    if (!e)
        return reporter;
    
    [e, reporter] = tryCatch(require, `putout-formatter-${name}`);
    
    if (e)
        exit(e);
    
    return reporter;
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
    
    if (isString(disable) && !disable) {
        console.log(object.rules);
        return;
    }
    
    if (isString(enable) && !enable) {
        console.log(object.rules);
        return;
    }
    
    writeFileSync(name, stringify(updated, null, 4));
}

