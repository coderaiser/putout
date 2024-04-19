'use strict';

const {matchToFlatDir} = require('./match-flat-to-dir');
const {entries} = Object;

module.exports.matchToFlatDir = matchToFlatDir;

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
