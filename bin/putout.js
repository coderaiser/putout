#!/usr/bin/env node

'use strict';

const {
    join,
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

const rendy = require('rendy');
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

let errorsCount = 0;
let filesCount = 0;

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
    const input = readFileSync(name, 'utf8');
    
    const [e, result] = tryCatch(putout, input);
    
    if (e) {
        console.error(underline(resolve(name)));
        console.error(e);
        const {
            line,
            column,
        } = e.loc;
        
        e.message = `${grey(`${line}:${column}`)} ${red(e.message)}}`;
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
            loc,
            message,
        } = place;
        
        const {
            line,
            column,
        } = loc;
        
        ++errorsCount;
        
        const msg = rendy(message, place);
        data.push([
            grey(`${line}:${column}`),
            `${red('error')}   ${msg}`,
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

