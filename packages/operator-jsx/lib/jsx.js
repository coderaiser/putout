'use strict';

const {types} = require('@putout/babel');
const {isJSXElement} = types;

module.exports.hasTagName = (path, name) => {
    const node = path.node || path;
    
    if (!isJSXElement(path))
        return false;
    
    return node.openingElement.name.name === name;
};
