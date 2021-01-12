'use strict';

const {join, dirname} = require('path');
const tryCatch = require('try-catch');

const merge = require('../merge');
const parseMatch = require('./parse-match');

module.exports = (name, configName) => {
    let mainDir;
    
    let dir = name;
    const optionsList = [];
    
    while (dir !== '/' && dir !== '.') {
        const path = join(dir, configName);
        const [, nextResult] = tryCatch(require, path);
        
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

