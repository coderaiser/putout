#!/usr/bin/env node

'use strict';

const {
    extname,
    resolve
} = require('path');

const {
    readFileSync,
    writeFileSync,
    statSync,
} = require('fs');

const {
    underline,
    red,
    grey,
    redBright,
    bold,
} = require('chalk');

const rendy = require('rendy');
const glob = require('glob');
const tryCatch = require('try-catch');
const deepmerge = require('deepmerge');
const {
    table,
    getBorderCharacters,
} = require('table');

const {cwd} = process;
const {keys} = Object;

const putout = require('..');
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
    
    console.log(bold(redBright(`✖ ${errorsCount} unused variables in ${filesCount} files`)));
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
        ...merge(options, parseMatch(match, name)),
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
        
        const msg = rendy(message, place);
        data.push([
            grey(`${line}:${column}`),
            `${red('error')}   ${msg}`,
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

function merge(base, custom) {
    const arrayMerge = (destinationArray, sourceArray) => sourceArray;
    return deepmerge(base, custom, {
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

function parseMatch(match, name) {
    if (!match)
        return {};
    
    const items = keys(match);
    
    for (const pattern of items)
        if (RegExp(`^${pattern}`).test(name)) {
            const rules = match[pattern];
            
            return {
                rules,
            };
        }
    
    return {};
}

