'use strict';

const {operator} = require('putout');
const {
    setLiteralValue,
    getProperties,
    findFile,
} = operator;

module.exports.report = (path, {from, to}) => `Replace '${from}' to '${to}'`;
module.exports.fix = (file, {from, to}) => {
    const {filenamePath} = getProperties(file, ['filename']);
    const {value} = filenamePath.node.value;
    const name = maybeCutSlash(value.replace(from, to));
    
    setLiteralValue(filenamePath.get('value'), name);
};

module.exports.scan = (path, {push, options}) => {
    const {from, to} = options;
    
    if (!from || !to)
        return;
    
    for (const file of findFile(path, '*')) {
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
