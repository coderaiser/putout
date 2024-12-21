'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Avoid empty 'import' statement`;

module.exports.fix = (path) => {
    remove(path);
};

const isCSS = (a) => /\.css/.test(a);
const isMin = (a) => /\.min\./.test(a);

module.exports.include = () => [
    'ImportDeclaration',
];

module.exports.filter = (path, {options}) => {
    const {specifiers, source} = path.node;
    
    const {ignore = []} = options;
    const {value} = source;
    
    if (ignore.includes(value))
        return false;
    
    if (specifiers.length)
        return false;
    
    if (isCSS(value))
        return false;
    
    return !isMin(value);
};
