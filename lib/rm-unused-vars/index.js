'use strict';

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');
const removeUnused = require('./remove-unused');

const fix = (f, a) => () => f(a);

module.exports = (ast) => {
    const vars = getVars(ast, {
        setLoc: true,
        setPath: true,
    });
    
    const transformed = transform(vars);
    const unused = getUnused(transformed);
    
    return {
        message: '',
        fix: fix(removeUnused, unused),
        unused,
    };
};

