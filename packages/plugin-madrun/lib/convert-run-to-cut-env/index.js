'use strict';

const {types, operator} = require('putout');

const {
    isArrayExpression,
    arrayExpression,
} = types;

const {
    getExportDefault,
    getProperty,
} = operator;

module.exports.report = () => `Use 'cutEnv()' instead of 'run()'`;

module.exports.replace = () => ({
    'run(__a)': (vars, path) => {
        const {body} = path.scope.block;
        
        if (!isArrayExpression(body)) {
            const tuple = getTuple(vars, path);
            path.scope.block.body = arrayExpression([tuple.elements[0], body]);
        }
        
        return 'cutEnv(__a)';
    },
});

module.exports.match = () => ({
    'run(__a)': getTuple,
});

function getTuple({__a}, path) {
    const exportDefault = getExportDefault(path);
    
    if (!exportDefault)
        return null;
    
    const declarationPath = exportDefault.get('declaration');
    
    if (isSameEnv({__a, path, declarationPath}))
        return null;
    
    const property = getProperty(declarationPath, __a.value);
    
    if (!property)
        return null;
    
    const {body} = property.node.value;
    
    if (!isArrayExpression(body))
        return null;
    
    return body;
}

function isSameEnv({__a, path, declarationPath}) {
    if (!path.parentPath.parentPath.isArrayExpression())
        return false;
    
    const [first] = path.parentPath.parentPath.node.elements;
    const propertyPath = getProperty(declarationPath, __a.value);
    
    if (!propertyPath)
        return false;
    
    const array = propertyPath.node.value.body;
    
    if (!isArrayExpression(array))
        return false;
    
    const [calledFirst] = array.elements;
    
    return first.name !== calledFirst.name;
}
