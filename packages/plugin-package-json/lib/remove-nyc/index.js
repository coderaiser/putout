'use strict';

const getKey = (a) => a.key;
const isNYC = (a) => a.value === 'nyc';

module.exports.report = () => 'Remove nyc section of package.json, use file .nycrc.json intead';

module.exports.match = () => ({
    '__putout_processor_json(__a)': ({__a}) => __a.properties
        .map(getKey)
        .filter(isNYC).length,
});

module.exports.replace = () => ({
    '__putout_processor_json(__a)': (vars, path) => {
        const properties = path.get('arguments.0.properties');
        
        for (const propPath of properties) {
            if (propPath.get('key.value').node === 'nyc')
                propPath.remove();
        }
        
        return path;
    },
});

