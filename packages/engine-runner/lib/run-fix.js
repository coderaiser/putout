'use strict';

const tryCatch = require('try-catch');
const debug = require('debug')('putout:runner:fix');
const {enabled} = debug;

const tryToFix = (fix, {path, position, options}) => {
    const [e] = tryCatch(fix, path, {options});
    
    if (!e)
        return;
    
    e.loc = e.loc || position;
    
    throw e;
};

module.exports = (is, fix, {path, rule, position, options}) => {
    if (!is)
        return;
    
    enabled && debug(`fix: ${rule}`, position, path.toString());
    
    tryToFix(fix, {
        path,
        position,
        options,
    });
};

