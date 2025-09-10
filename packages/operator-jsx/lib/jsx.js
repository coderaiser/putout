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
    
    if (!path)
        return result;
    
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

module.exports.getAttributeValue = getAttributeValue;
function getAttributeValue(path, attributeName) {
    const attribute = getAttributeNode(path, attributeName);
    
    if (!attribute)
        return '';
    
    return attribute.value.value;
}
module.exports.addAttributeValue = addAttributeValue;
function addAttributeValue(path, name, value) {
    const attributeNode = getAttributeNode(path, name);
    
    if (attributeNode.value.value.includes(value))
        return;
    
    setLiteralValue(attributeNode.value, `${attributeNode.value.value} ${value}`);
}
module.exports.removeAttributeValue = removeAttributeValue;
function removeAttributeValue(path, name, attributeValue) {
    if (!path)
        return;
    
    const node = path.node || path;
    const classAttribute = getAttributeNode(node, name);
    
    const {value} = classAttribute.value;
    
    if (value.includes(attributeValue))
        setLiteralValue(classAttribute.value, value.replace(RegExp(`\\s?${attributeValue}`), ''));
}
module.exports.setAttributeValue = (node, name, value) => {
    const attributeNode = getAttributeNode(node, name);
    
    if (attributeNode)
        setLiteralValue(attributeNode.value, value);
};

module.exports.addClassName = (path, name) => {
    addAttributeValue(path, 'className', name);
};

module.exports.getClassName = getClassName;
function getClassName(path) {
    return getAttributeValue(path, 'className');
}

module.exports.removeClassName = (path, name) => {
    removeAttributeValue(path, 'className', name);
};

module.exports.containsClassName = (path, className) => {
    const classNameValue = getClassName(path);
    return classNameValue.includes(className);
};

module.exports.hasDataName = (path, value = '') => {
    const attribute = getAttributeValue(path, 'data-name');
    return attribute === value;
};
