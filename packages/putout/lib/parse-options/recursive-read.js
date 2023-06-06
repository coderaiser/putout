'use strict';

const {dirname} = require('path');
const escalade = require('escalade/sync');

const merge = require('../merge');
const parseMatch = require('./parse-match');

module.exports = (name, configName, overrides) => {
    if (name === '<input>')
        return ['', {}];
    
    const customRequire = overrides?.require || require;
    const dir = dirname(name);
    
    const [mainDir, optionsList] = getOptionsList({
        dir,
        configName,
        customRequire,
    });
    
    let mergedOptions = merge(...optionsList);
    
    for (const currentOptions of optionsList)
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

function getOptionsList({dir, configName, customRequire}) {
    let mainDir;
    const optionsList = [];
    
    escalade(dir, (dir, names) => {
        if (!names.includes(configName))
            return;
        
        mainDir = mainDir || dir;
        optionsList.push(customRequire(`${dir}/${configName}`));
    });
    
    return [mainDir, optionsList.reverse()];
}
