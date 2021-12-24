'use strict';

module.exports.parseProperties = (node, names) => {
    const result = {};
    
    for (const {key, value} of node.properties) {
        if (names.includes(key.value)) {
            result[key.value] = value;
            continue;
        }
    }
    
    return result;
};

