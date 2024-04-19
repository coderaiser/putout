'use strict';

const process = require('node:process');
const {join} = require('node:path');
const {entries} = Object;

const CWD = process.cwd();

module.exports.matchToFlatDir = (path, config) => {
    const configPath = join(CWD, path, 'eslint.config.js');
    const {match} = config || require(configPath);
    
    const result = [];
    
    for (const [name, rules] of entries(match)) {
        result.push({
            files: ['**/' + join(path, name)],
            rules,
        });
    }
    
    return result;
};

module.exports.matchToFlat = (config) => {
    const result = [];
    
    for (const [name, rules] of entries(config)) {
        result.push({
            files: [name],
            rules,
        });
    }
    
    return result;
};
