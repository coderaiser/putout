#!/usr/bin/env node

'use strict';

const {
    extname,
    resolve,
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

const glob = require('glob');
const tryCatch = require('try-catch');
const {
    table,
    getBorderCharacters,
} = require('table');

const putout = require('..');
const getVars = require('../lib/get-vars');
const transform = require('../lib/transform');
const getUnused = require('../lib/get-unused');
const cutShebang = require('../lib/cut-shebang');

const one = (f) => (a) => f(a);

const argv = require('yargs-parser')(process.argv.slice(2), {
    boolean: [
        'version',
        'help',
        'fix',
        'raw',
        'raw-full',
    ],
    alias: {
        'v': 'version',
        'h': 'help',
    },
});

const {
    fix,
    raw,
    rawFull,
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

let unusedCount = 0;
let filesCount = 0;

const output = files
    .map(processFiles)
    .filter(Boolean);

if (output.length) {
    process.stdout.write('\n');
    output.map(one(console.log));
    
    console.log(bold(redBright(`✖ ${unusedCount} unused variables in ${filesCount} files`)));
    console.log(bold(redBright('  fixable with the `--fix` option')));
}

function processFiles(name) {
    const input = readFileSync(name, 'utf8');
    
    if (raw || rawFull)
        return showRaw(input);
    
    const [e, result] = tryCatch(putout, input);
    
    if (e) {
        console.error(underline(resolve(name)));
        exit(e);
    }
    
    const {code, unused} = result;
    
    if (fix)
        return writeFileSync(name, code);
    
    if (!unused.length)
        return;
    
    const data = [];
    ++filesCount;
    
    for (const item of unused) {
        const {loc, name} = item;
        const {line, column} = loc;
        
        ++unusedCount;
        
        data.push([
            grey(`${line}:${column}`),
            `${red('error')}   "${name}" is defined but never used`,
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

function showRaw(input) {
    const [source] = cutShebang(input);
    
    const vars = getVars(putout.parse(source));
    
    if (rawFull)
        return logObj(vars);
    
    const transformed = transform(vars);
    const unused = getUnused(transformed);
    
    logObj(unused);
}

function logObj(obj) {
    const str = JSON.stringify(obj, null, 4);
    console.log(str);
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
    const usage = 'Usage: putout [options]';
    
    console.log(usage);
    console.log('Options:');
    
    Object.keys(bin).forEach((name) => {
        console.log('  %s %s', name, bin[name]);
    });
}

function exit(e) {
    //console.error(red(e));
    console.error(e);
    process.exit(1);
}

