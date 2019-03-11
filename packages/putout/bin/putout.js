#!/usr/bin/env node

'use strict';

const {
    extname,
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
const report = require('../lib/report-end');
const readCodeMods = once(_readCodeMods);

const one = (f) => (a) => f(a);

const argv = require('yargs-parser')(process.argv.slice(2), {
    boolean: [
        'version',
        'help',
        'fix',
        'raw',
    ],
    number: [
        'fixCount',
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

const readUp = require('find-up');

const [e, files] = tryCatch(getFiles, argv._.map(String));

if (e)
    exit(e);

const ignore = require('ignore');

let errorsCount = 0;
let filesCount = 0;

const output = files
    .map(processFiles)
    .filter(Boolean);

if (output.length)
    process.exit(1);

function processFiles(name, index, {length}) {
    const resolvedName = resolve(name)
        .replace(/^\./, cwd);
    
    const [dirOpt, currOpt] = getOptions(cwd);
    const options = merge(currOpt, defaultOptions);
    const {match} = options;
    
    const ignorer = ignore();
    if (options.ignore)
        ignorer.add(options.ignore);
    
    const relativeName = getRelativePath(resolvedName, dirOpt);
    
    if (dirOpt && ignorer.ignores(relativeName))
        return;
    
    const input = readFileSync(name, 'utf8');
    
    const [e, result] = tryCatch(putout, input, {
        fix,
        fixCount,
        ...merge(
            defaultOptions,
            readCodeMods(),
            options,
            parseMatch(match, relativeName),
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
        return;
    }
    
    const {code, places} = result;
    
    if (fix)
        return writeFileSync(name, code);
    
    if (places.length)
        ++filesCount;
    errorsCount += places.length;
    
    if (!filesCount)
        return;
    
    if (!places.length && index !== length - 1)
        return;
    
    const line = report({
        name: resolvedName,
        places,
        index,
        count: length,
        filesCount,
        errorsCount,
    });
    
    process.stdout.write(line || '');
}

function addExt(a) {
    const ext = extname(a);
    const [e, file] = tryCatch(statSync, a);
    
    if (e)
        return a;
    
    const isDir = file.isDirectory();
    
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
    const arrayMerge = (a, b) => arrayUnion(b, a);
    return deepmerge.all(args, {
        arrayMerge,
    });
}

function getOptions(cwd) {
    const putoutPath = readUp.sync('.putout.json', {
        cwd,
    });
    
    if (putoutPath)
        return [
            dirname(putoutPath),
            require(putoutPath),
        ];
    
    const packagePath = readUp.sync('package.json', {
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

