'use strict';

const {
    basename,
    dirname,
    join,
} = require('node:path');

const {operator} = require('putout');
const {
    setLiteralValue,
    getProperties,
} = operator;

module.exports.report = (path, {from, to}) => `Replace '${from}' to '${to}'`;
module.exports.fix = (file, {from, to}) => {
    const {filenamePath} = getProperties(file, ['filename']);
    const value = maybeCutSlash(filenamePath.node.value.value);
    
    if (value === from) {
        setLiteralValue(filenamePath.get('value'), to);
        return;
    }
    
    const base = basename(value);
    const dir = dirname(value);
    
    if (from === '/') {
        const name = join(dir.replace(from, `${to}/`), base);
        setLiteralValue(filenamePath.get('value'), name);
        
        return;
    }
    
    const name = join(dir.replace(from, to), base);
    
    setLiteralValue(filenamePath.get('value'), name);
};

module.exports.scan = (path, {push, options, trackFile}) => {
    let {from, to} = options;
    
    if (!from || !to)
        return;
    
    from = maybeCutSlash(from);
    to = maybeCutSlash(to);
    
    for (const file of trackFile(path, '*')) {
        push(file, {
            from,
            to,
        });
    }
};

const maybeCutSlash = (a) => {
    a = a.replace('//', '/');
    
    if (a === '/')
        return a;
    
    return a.endsWith('/') ? a.slice(0, -1) : a;
};
