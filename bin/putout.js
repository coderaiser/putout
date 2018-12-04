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
        'vars',
    ]
});

const {
    fix,
    raw,
} = argv;

const files = argv._;

const putout = require('..');
const getVars = require('../lib/get-vars');

files.forEach(processFiles);

function processFiles(name) {
    const input = readFileSync(name, 'utf8');
    
    if (raw)
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

function showRaw() {
    const result = getVars(putout.parse(input), {
        returnPath: false,
    });
    
    console.log(JSON.stringify(result, null, 4));
}
