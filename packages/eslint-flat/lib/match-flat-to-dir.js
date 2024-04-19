'use strict';

const process = require('node:process');
const {join} = require('node:path');
const {entries} = Object;
const CWD = process.cwd();

module.exports.matchToFlatDir = (path, config) => {
    const configPath = join(CWD, path, 'eslint.config.js');
    const flatConfig = config || require(configPath);
    const {match} = flatConfig;
    
    if (match)
        return parseMatch(path, match);
    
    return parseFlatConfig(path, flatConfig);
};

function parseFlatConfig(path, flatConfig) {
    const result = [];
    
    for (const {files, rules} of flatConfig) {
        const [name] = files;
        
        result.push({
            files: ['**/' + join(path, name)],
            rules,
        });
    }
    
    return result;
}

function parseMatch(path, match) {
    const result = [];
    
    for (const [name, rules] of entries(match)) {
        result.push({
            files: ['**/' + join(path, name)],
            rules,
        });
    }
    
    return result;
}
