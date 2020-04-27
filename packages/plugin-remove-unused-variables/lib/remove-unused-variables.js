'use strict';

const {operator} = require('putout');
const {
    replaceWith,
    compare,
} = operator;

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');

module.exports.report = ({name}) => `"${name}" is defined but never used`;

module.exports.fix = ({path}) => {
    if (compare(path, 'const __a = __b = __c'))
        return replaceWith(path.parentPath, path.node.init);
    
    path.remove();
};

module.exports.find = (ast, {traverse}) => {
    const vars = getVars(ast, {
        setPath: true,
        traverse,
    });
    
    const transformed = transform(vars);
    const unused = getUnused(transformed);
    
    return unused;
};

