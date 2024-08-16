'use strict';

const {operator, types} = require('putout');

const {
    isObjectProperty,
    isSpreadElement,
} = types;

const {extract, remove} = operator;

module.exports.report = (path) => {
    const names = getPropertyNames(path);
    return `Remove useless properties: ${names.join(', ')}`;
};

module.exports.fix = (path) => {
    remove(path.parentPath.parentPath);
};

module.exports.traverse = ({push}) => ({
    ObjectExpression(path) {
        if (path.node.properties.length)
            return;
        
        if (!path.parentPath.isObjectProperty())
            return;
        
        if (hasSpread(path))
            return;
        
        const names = getPropertyNames(path);
        
        if (names.includes('ignores'))
            return;
        
        push(path);
    },
});

const getName = ({key}) => extract(key);

function getPropertyNames(path) {
    const names = path
        .parentPath
        .parentPath
        .node
        .properties
        .filter(isObjectProperty)
        .map(getName);
    
    return names;
}

function hasSpread(path) {
    const names = path.parentPath.parentPath.node.properties.filter(isSpreadElement);
    
    return names.length;
}
