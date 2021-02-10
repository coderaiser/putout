'use strict';

const {dirname} = require('path');
const escalade = require('escalade/sync');

const merge = require('../merge');
const parseMatch = require('./parse-match');

module.exports = (name, configName, overrides) => {
    const customRequire = overrides?.require || require;
    const optionsList = [];
    
    let mainDir;
    const dir = dirname(name);
    
    escalade(dir, (dir, names) => {
        if (!names.includes(configName))
            return;
        
        mainDir = mainDir || dir;
        optionsList.push(customRequire(`${dir}/${configName}`));
    });
    
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

