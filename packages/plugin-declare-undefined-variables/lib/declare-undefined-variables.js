'use strict';

const {template} = require('putout');

const nodes = {
    assign: template.ast('const {assign} = Object'),
    entries: template.ast('const {entries} = Object'),
    parse: template.ast('const {parse} = JSON'),
    stringify: template.ast('const {stringify} = JSON'),
    join: template.ast(`import {join} from 'path'`),
};

const {entries} = Object;

module.exports.report = () => 'Variable should be declared';

module.exports.match = ({options}) => {
    const {dismiss = []} = options;
    const traverseObject = {};
    
    for (const [name] of entries(nodes)) {
        if (dismiss.includes(name))
            continue;
        
        traverseObject[`${name}(__args)`] = isUndefined(name);
    }
    
    return traverseObject;
};

module.exports.replace = ({options}) => {
    const {dismiss = []} = options;
    const traverseObject = {};
    
    for (const [name, node] of entries(nodes)) {
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

