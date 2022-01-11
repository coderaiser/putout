'use strict';

const {types} = require('putout');
const {isArrayExpression} = types;

module.exports.report = () => `Use 'cutEnv()' instead of 'run()'`;

module.exports.match = () => ({
    'run(__a)': ({__a}, path) => {
        const exportDefault = getExportDefault(path);
        
        if (!exportDefault)
            return false;
        
        const property = findProperty(__a.value, exportDefault);
        
        if (!property)
            return false;
        
        const {body} = property.node.value;
        
        return isArrayExpression(body);
    },
});

module.exports.replace = () => ({
    'run(__a)': 'cutEnv(__a)',
});

function getExportDefault(path) {
    const programParent = path.scope.getProgramParent();
    const programPath = programParent.path;
    
    for (const current of programPath.get('body')) {
        if (current.isExportDefaultDeclaration())
            return current;
    }
    
    return null;
}

function findProperty(name, exportDefault) {
    const properties = exportDefault.get('declaration.properties');
    
    for (const current of properties) {
        if (current.node.key.value === name)
            return current;
    }
    
    return null;
}

