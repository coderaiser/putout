'use strict';

const {setLiteralValue} = require('@putout/operate');
const {types} = require('@putout/babel');
const {isJSXElement} = types;

module.exports.hasTagName = (path, name) => {
    const node = path.node || path;
    
    if (!isJSXElement(path))
        return false;
    
    return node.openingElement.name.name === name;
};

module.exports.getAttributePath = (path, name) => {
    const attributes = path.get('openingElement.attributes');
    
    for (const attr of attributes) {
        if (attr.node.name.name === name)
            return attr;
    }
    
    return null;
};

module.exports.getAttributeNode = getAttributeNode;
function getAttributeNode(path, name) {
    let result = null;
    
    const node = path.node || path;
    const {attributes} = node.openingElement;
    
    for (const attr of attributes) {
        if (attr.name.name === name) {
            result = attr;
            break;
        }
    }
    
    return result;
}

module.exports.getAttributeValue = (path, attributeName) => {
    const attribute = getAttributeNode(path, attributeName);
    
    if (!attribute)
        return '';
    
    return attribute.value.value;
};

module.exports.addAttributeValue = (path, name, value) => {
    const attributeNode = getAttributeNode(path, name);
    
    if (attributeNode.value.value.includes(value))
        return;
    
    setLiteralValue(attributeNode.value, `${attributeNode.value.value} ${value}`);
};
