'use strict';

const tryCatch = require('try-catch');

const {accessSync} = require('fs');

const {
    extname,
    dirname,
    join,
} = require('path');

const cwd = process.cwd();

const isRelative = (a) => /^\.\.?\//.test(a);
const getDir = (a) => a === '<input>' ? cwd : dirname(a);

module.exports.category = 'errors';
module.exports.report = () => 'Always add an extension to relative imports';
module.exports.include = () => ['ImportDeclaration'];

module.exports.fix = ({node, text, filename}) => {
    const {source} = node;
    const {value} = source;
    
    const dir = getDir(filename);
    
    const resolved = resolveSource({
        dir,
        value,
    });
    
    return text.replace(value, resolved);
};

module.exports.filter = ({node}) => {
    const {source} = node;
    const {value} = source;
    
    if (!isRelative(value))
        return false;
    
    return !extname(value);
};

function resolveSource({dir, value}) {
    for (const ext of ['js', 'mjs', 'cjs']) {
        const name = join(dir, `${value}.${ext}`);
        const [error] = tryCatch(accessSync, name);
        
        if (!error)
            return `${value}.${ext}`;
    }
    
    const name = join(dir, value, `index.js`);
    const [error] = tryCatch(accessSync, name);
    
    if (!error)
        return join(value, 'index.js');
    
    return `${value}.js`;
}
