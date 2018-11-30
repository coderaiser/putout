#!/usr/bin/env node

'use strict';

const {
    readFileSync,
    writeFileSync,
} = require('fs');

const chalk = require('chalk');
const argv = require('yargs-parser')(process.argv.slice(2), {
    boolean: [
        'fix'
    ]
});

const fix = argv.fix;
const files = argv._;

const putout = require('../lib/putout');

files.forEach(processFiles);

function processFiles(name) {
    const input = readFileSync(name, 'utf8');
    const {code, unused} = putout(input);
    
    if (fix)
        return writeFileSync(name, code);
    
    for (const item of unused) {
        const {loc, name} = item;
        const {line, column} = loc;
        
        console.log(` ${line}:${column} ${chalk.red('error')}  "${name}" is defined but never used`);
    }
}

