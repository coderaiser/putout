'use strict';

const {operator, types} = require('putout');
const {
    traverse,
    remove,
    rename,
    getProperty,
    replaceWith,
    compare,
} = operator;

const {
    isReturnStatement,
    isObjectMethod,
    isObjectProperty,
    isObjectExpression,
    identifier,
    isVariableDeclarator,
} = types;

module.exports.report = () => `Use Scanner instead of Traverser`;

module.exports.fix = ({path, pathProperty}) => {
    if (path.isObjectMethod()) {
        replaceWith(path.parentPath, path.get('body'));
        path.parentPath.parentPath.node.params.unshift(identifier('path'));
        
        const currentPath = path.parentPath.parentPath.parentPath;
        
        if (isVariableDeclarator(currentPath))
            currentPath.node.init.name = 'scan';
        else
            currentPath.node.left.property.name = 'scan';
        
        return;
    }
    
    if (path.isObjectProperty()) {
        replaceWith(path.parentPath, path.get('value.body'));
        path.parentPath.parentPath.node.params.unshift(identifier('path'));
        
        const assignmentPath = path.parentPath.parentPath.parentPath;
        
        if (!assignmentPath.isAssignmentExpression())
            return;
        
        const {left} = assignmentPath.node;
        
        left.property.name = 'scan';
        return;
    }
    
    if (path.isCallExpression()) {
        const {value} = pathProperty.node;
        pathProperty.parentPath.parentPath.node.arguments.unshift(value);
        
        const {path: programPath} = path.scope.getProgramParent();
        
        traverse(programPath, {
            'module.exports.fix = (__object) => __': (path) => {
                const rightPath = path.get('right');
                const [argPath] = rightPath.get('params');
                
                rightPath.node.params.unshift(value);
                
                const pathPropertyFix = getProperty(argPath, 'path');
                rename(pathPropertyFix, 'path', value.name);
                remove(pathPropertyFix);
            },
            'module.exports.report = (__object) => __': (path) => {
                const rightPath = path.get('right');
                const [argPath] = rightPath.get('params');
                
                rightPath.node.params.unshift(value);
                
                const pathPropertyFix = getProperty(argPath, 'path');
                
                if (pathPropertyFix) {
                    rename(pathPropertyFix, 'path', value.name);
                    remove(pathPropertyFix);
                }
            },
        });
        
        remove(pathProperty);
    }
};

module.exports.traverse = ({push}) => ({
    'ObjectMethod|ObjectProperty'(path) {
        if (!isFilesystemPath(path))
            return;
        
        push({
            path,
        });
    },
    'push(__a)'(path) {
        const __aPath = path.get('arguments.0');
        
        if (!__aPath.isObjectExpression())
            return;
        
        if (path.find(isReturnStatement))
            return;
        
        if (!path.find(isFilesystemPath) && !path.find(isScan))
            return;
        
        const pathProperty = getProperty(__aPath, 'path');
        
        push({
            path,
            pathProperty,
        });
    },
});

function isScan(path) {
    return compare(path, 'module.exports.scan = __');
}

function isFilesystemPath(path) {
    if (!isObjectMethod(path) && !isObjectProperty(path))
        return false;
    
    if (isObjectExpression(path.parentPath) && path.parentPath.node.properties.length > 1)
        return false;
    
    const {computed} = path.node;
    
    if (!computed)
        return false;
    
    if (path.node.key.name !== '__filesystem' && path.node.key.name !== 'FS')
        return false;
    
    return !path.parentPath.parentPath.isReturnStatement();
}
