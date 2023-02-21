'use strict';

const {types} = require('putout');
const {
    isIdentifier,
    isObjectProperty,
} = types;

const getValue = ({value}) => value;

module.exports.report = (path) => {
    const variables = getVariables(path);
    const names = getNames(variables);
    
    return `"${names.join(', ')}" inside for-of defined but never used`;
};

module.exports.match = () => ({
    'for (const __array of __b) __c': (vars, path) => match(path),
    'for (const __object of __b) __c': (vars, path) => match(path),
});

module.exports.replace = () => ({
    'for (const __array of __b) __c': (vars, path) => replace(path),
    'for (const __object of __b) __c': (vars, path) => replace(path),
});

function match(path) {
    const idPath = path.get('left.declarations.0.id');
    const elements = getElements(idPath);
    
    if (!isAllIdentifiers(elements))
        return false;
    
    if (isAllReferenced(idPath, elements))
        return false;
    
    return true;
}

function replace(path) {
    const variables = getVariables(path);
    
    for (const currentPath of variables) {
        currentPath.remove();
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

function isAllIdentifiers(array) {
    const realArray = array.filter(Boolean);
    
    const {length} = realArray;
    const {length: realLength} = realArray.filter(isIdentifier);
    
    return length === realLength;
}

function isReferenced({scope}, path) {
    const {bindings} = scope;
    
    if (path.isObjectProperty()) {
        const {name} = path.node.value;
        const current = bindings[name];
        
        return !current || current.referenced;
    }
    
    const {node} = path;
    
    if (!node)
        return true;
    
    const {name} = path.node;
    
    return bindings[name].referenced;
}

function isAllReferenced(path, array) {
    const {bindings} = path.scope;
    
    for (const {name} of array) {
        const current = bindings[name];
        
        if (!current.referenced)
            return false;
    }
    
    return true;
}

function getElements({node}) {
    const {
        properties,
        elements,
    } = node;
    
    if (elements)
        return elements.filter(Boolean);
    
    return properties.map(getValue).filter(Boolean);
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

