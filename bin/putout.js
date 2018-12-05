#!/usr/bin/env node

'use strict';

const {
    readFileSync,
    writeFileSync,
} = require('fs');

const chalk = require('chalk');
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

const files = argv._;

const putout = require('..');
const getVars = require('../lib/get-vars');
const transform = require('../lib/transform');
const getUnused = require('../lib/get-unused');

files.forEach(processFiles);

function processFiles(name) {
    const input = readFileSync(name, 'utf8');
    
    if (raw || rawFull)
        return showRaw(input);
    
    const {code, unused} = putout(input);
    
    if (fix)
        return writeFileSync(name, code);
    
    for (const item of unused) {
        const {loc, name} = item;
        const {line, column} = loc;
        
        console.log(` ${line}:${column} ${chalk.red('error')}  "${name}" is defined but never used`);
    }
}

function showRaw(input) {
    const vars = getVars(putout.parse(input), {
        returnPath: false,
    });
    
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

