'use strict';

const {types, operator} = require('putout');

const {isArrayExpression} = types;

const {
    getExportDefault,
    getProperty,
} = operator;

module.exports.report = () => `Use 'cutEnv()' instead of 'run()'`;

module.exports.replace = () => ({
    'cutEnv(__a)': 'run(__a)',
});

module.exports.match = () => ({
    'cutEnv(__a)': ({__a}, path) => {
        const exportDefault = getExportDefault(path);
        
        if (!exportDefault)
            return false;
        
        const declarationPath = exportDefault.get('declaration');
        const property = getProperty(declarationPath, __a.value);
        
        if (!property)
            return false;
        
        const {body} = property.node.value;
        
        return !isArrayExpression(body);
    },
});
