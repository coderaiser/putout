'use strict';

const {types} = require('putout');
const {isImportDeclaration} = types;

const declarations = require('./declarations');

const {entries} = Object;

module.exports.report = (path) => {
    const {name} = path.node.callee;
    return `'${name}' should be declared`;
};

module.exports.match = ({options}) => {
    const {dismiss = []} = options;
    const traverseObject = {};
    
    for (const [name] of entries(declarations)) {
        if (dismiss.includes(name))
            continue;
        
        traverseObject[`${name}(__args)`] = isUndefined(name);
    }
    
    return traverseObject;
};

module.exports.replace = ({options}) => {
    const {dismiss = []} = options;
    const traverseObject = {};
    
    for (const [name, node] of entries(declarations)) {
        if (dismiss.includes(name))
            continue;
        
        traverseObject[`${name}(__args)`] = createUndefined(name, node);
    }
    
    return traverseObject;
};

const isUndefined = (name) => (vars, path) => {
    return !path.scope.getAllBindings()[name];
};

const createUndefined = (name, node) => (vars, path) => {
    const scope = path.scope.getProgramParent();
    const bodyPath = scope.path.get('body');
    
    if (isImportDeclaration(node)) {
        bodyPath[0].insertBefore(node);
        return path;
    }
    
    for (const currentPath of bodyPath) {
        if (currentPath.isVariableDeclaration())
            continue;
        
        if (currentPath.isImportDeclaration())
            continue;
        
        currentPath.insertBefore(node);
        break;
    }
    
    return path;
};

