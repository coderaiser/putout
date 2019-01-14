#!/usr/bin/env node

'use strict';

const {
    extname,
    resolve
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
    redBright,
    bold,
} = require('chalk');

const once = require('once');
const glob = require('glob');
const tryCatch = require('try-catch');
const deepmerge = require('deepmerge');
const arrayUnion = require('array-union');
const {
    table,
    getBorderCharacters,
} = require('table');

const {cwd} = process;

const defaultOptions = require('../putout.json');

const putout = require('..');
const parseMatch = require('../lib/parse-match');
const readCodeMods = once(_readCodeMods);

const one = (f) => (a) => f(a);

const argv = require('yargs-parser')(process.argv.slice(2), {
    boolean: [
        'version',
        'help',
        'fix',
        'raw',
    ],
    string: [
        'config',
    ],
    alias: {
        'v': 'version',
        'h': 'help',
        'c': 'config',
    },
    default: {
        fix: false,
    }
});

const {
    fix,
    raw,
    config,
} = argv;

if (argv.version) {
    console.log(require('../package.json').version);
    process.exit();
}

if (argv.help) {
    help();
    process.exit();
}

const [e, files] = tryCatch(getFiles, argv._);

if (e)
    exit(e);

let errorsCount = 0;
let filesCount = 0;

const options = mergeOptions(getOptions());
const ignore = require('ignore')();

if (options.ignore)
    ignore.add(options.ignore);

const output = files
    .map(processFiles)
    .filter(Boolean);

if (output.length) {
    process.stdout.write('\n');
    output.map(one(console.log));
    
    console.log(bold(redBright(`✖ ${errorsCount} errors in ${filesCount} files`)));
    console.log(bold(redBright('  fixable with the `--fix` option')));
}

function processFiles(name) {
    const {
        match,
    } = options;
    
    if (ignore.ignores(name))
        return;
    
    const input = readFileSync(name, 'utf8');
    
    const [e, result] = tryCatch(putout, input, {
        fix,
        ...merge(
            defaultOptions,
            readCodeMods(),
            options,
            parseMatch(match, name)
        ),
    });
    
    if (e) {
        console.error(underline(resolve(name)));
        const {
            line,
            column,
        } = e.position || {
            line: 'x',
            column: 'x',
        };
        
        e.message = `${grey(`${line}:${column}`)} ${red(e.message)}`;
        exit(e);
    }
    
    const {code, places} = result;
    
    if (!places.length)
        return;
    
    if (fix)
        return writeFileSync(name, code);
    
    const data = [];
    ++filesCount;
    
    for (const place of places) {
        const {
            message,
            position,
            rule,
        } = place;
        
        const {
            line,
            column,
        } = position;
        
        ++errorsCount;
        
        data.push([
            grey(`${line}:${column}`),
            `${red('error')}   ${message}`,
            grey(rule),
        ]);
    }
    
    return [
        underline(resolve(name)),
        table(data, {
            border: getBorderCharacters('void'),
            drawHorizontalLine: () => false,
        })
    ].join('\n');
}

function addExt(a) {
    const ext = extname(a);
    const isDir = statSync(a).isDirectory();
    
    if (isDir && ext !== '.js')
        return `${a}/**/*.js`;
    
    return a;
}

function getFiles(args) {
    const files = args
        .map(addExt)
        .map(one(glob.sync));
    
    return [].concat(...files);
}

function help() {
    const bin = require('../help');
    const usage = 'Usage: putout [options] [path]';
    
    console.log(usage);
    console.log('Options:');
    
    Object.keys(bin).forEach((name) => {
        console.log('  %s %s', name, bin[name]);
    });
}

function exit(e) {
    if (raw)
        console.error(e);
    else
        console.error(red(e.message));
    
    process.exit(1);
}

function merge(...args) {
//    const arrayMerge = (destinationArray, sourceArray) => sourceArray;
    const arrayMerge = (a, b) => arrayUnion(a, b);
    return deepmerge.all(args, {
        arrayMerge,
    });
}

function mergeOptions(baseOptions = {}) {
    if (!config)
        return baseOptions;
    
    const customOptions = require(`${cwd()}/${config}`);
    
    return merge(baseOptions, customOptions);
}

function getOptions() {
    const readUp = require('find-up');
    
    const putoutPath = readUp.sync('.putout.json');
    if (putoutPath)
        return require(putoutPath);
    
    const infoPath = readUp.sync('package.json');
    if (infoPath)
        return require(infoPath).putout;
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
            [shortName]: plugin
        });
    }
    
    return {
        plugins,
    };
}

