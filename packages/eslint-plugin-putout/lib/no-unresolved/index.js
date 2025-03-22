'use strict';

const process = require('node:process');
const {accessSync} = require('node:fs');

const {
    extname,
    dirname,
    join,
} = require('node:path');

const tryCatch = require('try-catch');

const cwd = process.cwd();

const RELATIVE = '\\.\\.?\\/?';
const isRelativeStart = (a) => RegExp(`^${RELATIVE}`).test(a);
const isRelativeEnd = (a) => RegExp(`${RELATIVE}$`).test(a);
const getDir = (a) => a === '<input>' ? cwd : dirname(a);
const getValue = ({source}) => source?.value;

module.exports.category = 'errors';
module.exports.report = () => 'Always add an extension to relative imports';
module.exports.include = () => [
    'ImportDeclaration',
    'ImportExpression',
    'ExportAllDeclaration',
    'ExportNamedDeclaration',
];

module.exports.fix = ({node, text, filename}) => {
    const value = getValue(node);
    const dir = getDir(filename);
    
    const resolved = resolveSource({
        dir,
        value,
    });
    
    return text.replace(value, resolved);
};

module.exports.filter = ({node}) => {
    const value = getValue(node);
    
    if (!value || value.endsWith('.js'))
        return false;
    
    if (!isRelativeStart(value))
        return false;
    
    return !extname(value);
};

function resolveSource({dir, value}) {
    if (isRelativeEnd(value)) {
        const name = join(dir, value, 'package.json');
        const [error, info] = tryCatch(require, name);
        
        if (!error)
            return join(value, info.main);
        
        return `${value}/index.js`;
    }
    
    for (const ext of ['js', 'mjs', 'cjs']) {
        const name = join(dir, `${value}.${ext}`);
        const [error] = tryCatch(accessSync, name);
        
        if (!error)
            return `${value}.${ext}`;
    }
    
    const name = join(dir, value, `index.js`);
    const [error] = tryCatch(accessSync, name);
    
    if (!error)
        return `${value}/index.js`;
    
    return `${value}.js`;
}
