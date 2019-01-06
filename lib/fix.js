'use strict';

const tryCatch = require('try-catch');

const tryToFix = (fix, {path, position}) => {
    const [e] = tryCatch(fix, path);
    
    if (!e)
        return;
    
    e.position = position;
    
    throw e;
};

module.exports = (is, fix, {path, position}) => {
    if (!is)
        return;
    
    tryToFix(fix, {
        path,
        position,
    });
};

