'use strict';

const {types, operator} = require('putout');

const {
    isIdentifier,
    isObjectProperty,
} = types;

const {remove} = operator;
const getValue = ({value}) => value;

module.exports.report = (path) => {
    const variables = getVariables(path);
    const names = getNames(variables);
    
    return `'${names.join(', ')}' inside 'for...of' loop defined but never used`;
};

module.exports.match = () => ({
    'for (const __array of __b) __c': matchForOf,
    'for (const __object of __b) __c': matchForOf,
});

module.exports.replace = () => ({
    'for (const __array of __b) __c': replaceForOf,
    'for (const __object of __b) __c': replaceForOf,
});

function matchForOf(vars, path) {
    const idPath = path.get('left.declarations.0.id');
    const elements = getElements(idPath);
    
    return !isAllReferenced(idPath, elements);
}

function replaceForOf(vars, path) {
    const variables = getVariables(path);
    
    for (const currentPath of variables) {
        remove(currentPath);
    }
    
    return path;
}

function getVariables(path) {
    const idPath = path.get('left.declarations.0.id');
    const elements = getPathElements(idPath);
    const result = [];
    
    for (const el of elements) {
        if (!isReferenced(path, el))
            result.push(el);
    }
    
    return result;
}

function isReferenced({scope}, path) {
    const {bindings} = scope;
    
    if (path.isObjectProperty()) {
        const {name} = path.node.value;
        const current = bindings[name];
        
        return !current || current.referenced;
    }
    
    if (path.isObjectPattern())
        return true;
    
    const {node} = path;
    
    if (!node)
        return true;
    
    const {name} = path.node;
    
    return bindings[name].referenced;
}

function isAllReferenced(path, nodes) {
    const {bindings} = path.scope;
    
    for (const node of nodes) {
        if (isIdentifier(node)) {
            const {name} = node;
            const current = bindings[name];
            
            if (!current.referenced)
                return false;
            
            continue;
        }
    }
    
    return true;
}

function getElements({node}) {
    const {properties, elements} = node;
    
    if (elements)
        return elements.filter(Boolean);
    
    return properties
        .map(getValue)
        .filter(Boolean);
}

function getPathElements(path) {
    if (path.isObjectPattern())
        return path.get('properties');
    
    return path.get('elements');
}

function getNames(paths) {
    const result = [];
    
    for (const {node} of paths) {
        if (isObjectProperty(node)) {
            result.push(node.value.name);
            continue;
        }
        
        result.push(node.name);
    }
    
    return result;
}
