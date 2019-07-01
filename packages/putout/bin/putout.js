#!/usr/bin/env node

'use strict';

const {
    resolve,
    dirname,
} = require('path');

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
const deepmerge = require('deepmerge');
const arrayUnion = require('array-union');

const defaultOptions = require('../putout.json');

const putout = require('..');
const parseMatch = require('../lib/parse-match');
const getRelativePath = require('../lib/get-relative-path');
const report = require('../lib/report')();

const readCodeMods = once(_readCodeMods);
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
    ],
    number: [
        'fixCount',
    ],
    string: [
        'config',
        'format',
        'disable',
        'enable',
    ],
    alias: {
        'v': 'version',
        'h': 'help',
        'c': 'config',
        'f': 'format',
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
} = argv;

if (argv.version) {
    console.log(`v${require('../package.json').version}`);
    process.exit();
}

if (argv.help) {
    help();
    process.exit();
}

const findUp = require('find-up');

const [e, files] = tryCatch(getFiles, argv._.map(String));

if (e)
    exit(e);

const ignore = require('ignore');

const places = files
    .map(processFiles)
    .filter(Boolean);

const isRuler = (a) => a.disable || a.enable || a.disableAll || a.enableAll;
const mergedPlaces = Array.from(merge(...places));

if (isRuler(argv)) {
    return rulerProcessor(argv, mergedPlaces);
}

if (mergedPlaces.length)
    process.exit(1);

function processFiles(name, index, {length}) {
    const resolvedName = resolve(name)
        .replace(/^\./, cwd);
    
    const [dirOpt, currOpt] = getOptions(cwd);
    const options = merge(defaultOptions, currOpt);
    const {match, formatter} = options;
    const format = getFormatter(argv.format || formatter);
    
    const ignorer = ignore();
    
    if (options.ignore)
        ignorer.add(options.ignore);
    
    const relativeName = getRelativePath(resolvedName, dirOpt);
    
    if (dirOpt && ignorer.ignores(relativeName)) {
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
    
    const [e, result] = tryCatch(putout, input, {
        fix,
        fixCount,
        isTS,
        ...merge(
            defaultOptions,
            readCodeMods(),
            options,
            parseMatch(match, relativeName)
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

function merge(...args) {
    const arrayMerge = (a, b) => arrayUnion(b, a);
    return deepmerge.all(args, {
        arrayMerge,
    });
}

function getOptions(cwd) {
    const putoutPath = findUp.sync('.putout.json', {
        cwd,
    });
    
    if (putoutPath)
        return [
            dirname(putoutPath),
            require(putoutPath),
        ];
    
    const packagePath = findUp.sync('package.json', {
        cwd,
    });
    
    if (packagePath)
        return [
            dirname(packagePath),
            require(packagePath).putout || {},
        ];
    
    return [
        '',
        {},
    ];
}

function _readCodeMods() {
    const {join} = require('path');
    const {homedir} = require('os');
    
    const dir = join(homedir(), '.putout');
    const [e, names] = tryCatch(readdirSync, dir);
    
    if (e)
        return {};
    
    const plugins = [];
    
    for (const name of names) {
        const full = join(dir, name);
        const plugin = require(full);
        const shortName = name.replace('putout-plugin-');
        
        plugins.push({
            [shortName]: plugin,
        });
    }
    
    return {
        plugins,
    };
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
    const [, data = {}] = tryCatch(readFileSync, name, 'utf8');
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
    
    writeFileSync(name, stringify(updated, null, 4));
}

