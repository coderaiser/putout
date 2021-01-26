'use strict';

const {join, dirname} = require('path');
const tryCatch = require('try-catch');

const merge = require('../merge');
const parseMatch = require('./parse-match');

module.exports = (name, configName, overrides) => {
    const customRequire = overrides?.require || require;
    let mainDir;
    let dir = name;
    
    const optionsList = [];
    
    while (dir !== dirname(dir)) {
        const path = join(dir, configName);
        const [error, nextResult] = tryCatch(customRequire, path);
        
        if (error && error.code !== 'MODULE_NOT_FOUND') {
            throw error;
        }
        
        if (nextResult) {
            mainDir = mainDir || dir;
            optionsList.push(nextResult);
        }
        
        dir = dirname(dir);
    }
    
    let mergedOptions = merge(...optionsList);
    
    for (const currentOptions of optionsList.reverse())
        mergedOptions = merge(
            mergedOptions,
            currentOptions,
            parseMatch(
                name,
                currentOptions.match,
            ),
        );
    
    return [mainDir, mergedOptions];
};

