'use strict';

const {entries} = Object;

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
