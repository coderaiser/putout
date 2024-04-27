'use strict';

const {relative} = require('node:path');
const ignore = require('ignore');

const isNegative = (a) => !a.indexOf('!');
const positive = (a) => a.replace(/^!/, '');

module.exports = (dirOpt, resolvedName, options = {}) => {
    const relativeName = relative(dirOpt, resolvedName);
    const ignorer = ignore();
    const ignoreList = mergeIgnores(options.ignore || []);
    
    ignorer.add(ignoreList);
    
    return dirOpt && ignorer.ignores(relativeName);
};

function mergeIgnores(ignores) {
    for (const [i, str] of ignores.entries()) {
        const positiveIndex = ignores.indexOf(positive(str));
        
        if (isNegative(str) && positiveIndex > i)
            ignores[positiveIndex] = str;
    }
    
    const noDuplicates = new Set(ignores);
    
    return Array.from(noDuplicates);
}
