'use strict';

module.exports.report = () => `Add anchor '#readme' to 'homepage' in package.json`;

module.exports.match = () => ({
    '__putout_processor_json(__a)': ({__a}) => {
        const {homepage} = parseProperties(__a, [
            'homepage',
        ]);
        
        if (!homepage)
            return false;
        
        return !homepage.value.includes('#readme');
    },
});

module.exports.replace = () => ({
    '__putout_processor_json(__a)': ({__a}, path) => {
        const {homepage} = parseProperties(__a, [
            'homepage',
        ]);
        
        homepage.value += '#readme';
        
        return path;
    },
});

function parseProperties(node, names) {
    const result = {};
    
    for (const {key, value} of node.properties) {
        if (names.includes(key.value)) {
            result[key.value] = value;
            continue;
        }
    }
    
    return result;
}

