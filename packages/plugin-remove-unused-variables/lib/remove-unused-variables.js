'use strict';

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');

module.exports.report = ({name}) => `"${name}" is defined but never used`;

module.exports.fix = ({path}) => {
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

