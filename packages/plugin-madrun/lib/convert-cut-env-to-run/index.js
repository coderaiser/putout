'use strict';

const {types} = require('putout');
const {isArrayExpression} = types;
const {getExportDefault} = require('../get-export-default');
const {getProperty} = require('../get-property');

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

