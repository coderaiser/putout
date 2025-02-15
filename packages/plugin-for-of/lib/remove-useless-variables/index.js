'use strict';

const {types, operator} = require('putout');

const {replaceWith, remove} = operator;
const {
    isAssignmentPattern,
    isObjectPattern,
} = types;

const isToManyProperties = (a, {maxProperties}) => a.isObjectPattern() && a.node.properties.length > maxProperties;
const isAssignment = (a) => isAssignmentPattern(a.value);

module.exports.report = () => `Use destructuring in head of 'for...of'`;

module.exports.fix = ({path, varPath}) => {
    replaceWith(varPath, path.node.id);
    remove(path);
};

module.exports.traverse = ({push, options}) => ({
    'for (const __ of __) __'(path) {
        const leftPath = path.get('left');
        const varPath = leftPath.get('declarations.0.id');
        
        if (!varPath.isIdentifier())
            return;
        
        const {scope, node} = varPath;
        const {name} = node;
        const {references, referencePaths} = scope.bindings[name];
        
        if (references !== 1)
            return;
        
        const [referencePath] = referencePaths;
        const {parentPath} = referencePath;
        
        if (!parentPath.isVariableDeclarator())
            return;
        
        const idPath = parentPath.get('id');
        const {maxProperties = 4} = options;
        
        if (isToManyProperties(idPath, {maxProperties}))
            return;
        
        if (isNested(idPath))
            return;
        
        const {properties} = idPath.node;
        
        if (idPath.isObjectPattern() && properties.find(isAssignment))
            return;
        
        push({
            path: parentPath,
            varPath,
        });
    },
});

function isNested(path) {
    if (!path.isObjectPattern())
        return false;
    
    for (const {value} of path.node.properties) {
        if (isObjectPattern(value))
            return true;
    }
    
    return false;
}
