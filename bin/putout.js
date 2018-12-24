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

const chalk = require('chalk');
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
        'fix',
        'raw',
        'raw-full',
    ]
});

const {
    fix,
    raw,
    rawFull,
} = argv;

const [e, files] = tryCatch(getFiles, argv._);

if (e) {
    console.error(e);
    process.exit(1);
}

files.map(processFiles);

function processFiles(name) {
    const input = readFileSync(name, 'utf8');
    
    if (raw || rawFull)
        return showRaw(input);
    
    const {code, unused} = putout(input);
    
    if (fix)
        return writeFileSync(name, code);
    
    const data = [];
    //    chalk.grey.underline('location'),
    //    chalk.underline(resolve(name)),
    //]];
    
    for (const item of unused) {
        const {loc, name} = item;
        const {line, column} = loc;
        
        //console.log(` ${line}:${column} ${chalk.red('error')}  "${name}" is defined but never used`);
        data.push([
            chalk.grey(`${line}:${column}`),
            `${chalk.red('error')}   "${name}" is defined but never used`,
        ]);
    }
    
    console.log(chalk.underline(resolve(name)));
    process.stdout.write(table(data, {
        border: getBorderCharacters('void'),
        drawHorizontalLine: () => false,
    }));
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

