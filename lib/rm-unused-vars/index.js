'use strict';

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');
const removeUnused = require('./remove-unused');

module.exports = (ast) => {
    const vars = getVars(ast, {
        setPath: true,
        setLoc: true,
    });
    
    const transformed = transform(vars);
    const unused = getUnused(transformed);
    
    removeUnused(unused);
    
    return unused;
};

module.exports.message = '"{{ name }}" is defined but never used';

