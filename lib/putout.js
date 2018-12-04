'use strict';

const {
    parse,
    print,
} = require('recast');

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');
const removeUnused = require('./remove-unused');

module.exports = (source) => {
    const ast = parse(source);
    const vars = getVars(ast);
    
    const transformed = transform(vars);
    const unused = getUnused(transformed);
    
    removeUnused(unused);
    
    const {code} = print(ast);
    
    return {
        code,
        unused,
    };
};

