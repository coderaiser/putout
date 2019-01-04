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
const one = (f) => (a) => f(a);

const argv = require('yargs-parser')(process.argv.slice(2), {
    boolean: [
        'version',
        'help',
        'fix',
        'raw',
    ],
    alias: {
        'v': 'version',
        'h': 'help',
    },
});

const {
    fix,
    raw,
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
    
    const [e, result] = tryCatch(putout, input, {
        fix,
    });
    
    if (e) {
        console.error(underline(resolve(name)));
        const {
            line,
            column,
        } = e.loc;
        
        e.message = `${grey(`${line}:${column}`)} ${red(e.message)}}`;
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
    if (raw)
        console.error(e);
    else
        console.error(red(e.message));
    
    process.exit(1);
}

