'use strict';

const tryCatch = require('try-catch');
const debug = require('debug')('putout:runner:fix');
const {enabled} = debug;

debug('xxxxx');

const tryToFix = (fix, {path, position}) => {
    const [e] = tryCatch(fix, path);
    
    if (!e)
        return;
    
    e.loc = e.loc || position;
    
    throw e;
};

module.exports = (is, fix, {path, rule, position}) => {
    if (!is)
        return;
    
    enabled && debug(`fix: ${rule}`, position, path.toString());
    
    tryToFix(fix, {
        path,
        position,
    });
};

