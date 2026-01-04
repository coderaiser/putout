import {setLiteralValue} from '@putout/operate';
import {types} from '@putout/babel';

const {
    isJSXElement,
    jsxAttribute,
    jsxIdentifier,
    stringLiteral,
} = types;

const getNode = (a) => a.node || a;

export const hasTagName = (path, name) => {
    const node = getNode(path);
    
    if (!isJSXElement(path))
        return false;
    
    return node.openingElement.name.name === name;
};

export const getAttributePath = (path, name) => {
    const attributes = path.get('openingElement.attributes');
    
    for (const attr of attributes) {
        if (attr.node.name.name === name)
            return attr;
    }
    
    return null;
};

export function getAttributeNode(path, name) {
    let result = null;
    const node = getNode(path);
    const {attributes} = node.openingElement;
    
    for (const attr of attributes) {
        if (attr.name.name === name) {
            result = attr;
            break;
        }
    }
    
    return result;
}

export function getAttributeValue(path, attributeName) {
    const attribute = getAttributeNode(path, attributeName);
    
    if (!attribute)
        return '';
    
    return attribute.value.value;
}

export function addAttributeValue(path, name, value) {
    const attributeNode = getAttributeNode(path, name);
    
    if (!attributeNode)
        return addAttribute(path, name, value);
    
    if (attributeNode.value.value.includes(value))
        return;
    
    setLiteralValue(attributeNode.value, `${attributeNode.value.value} ${value}`);
}

export function addAttribute(path, name, value) {
    const node = getNode(path);
    let attributeNode = getAttributeNode(node, name);
    
    if (!attributeNode) {
        attributeNode = jsxAttribute(jsxIdentifier(name), stringLiteral(value));
        node.openingElement.attributes.push(attributeNode);
    }
}

export function removeAttributeValue(path, name, attributeValue) {
    if (!path)
        return;
    
    const node = path.node || path;
    const classAttribute = getAttributeNode(node, name);
    
    const {value} = classAttribute.value;
    
    if (!value.includes(attributeValue))
        return;
    
    const newValue = value
        .replace(RegExp(`\\s?${attributeValue}`), '')
        .trim();
    
    setLiteralValue(classAttribute.value, newValue);
}

export const setAttributeValue = (path, name, value) => {
    const attributeNode = getAttributeNode(path, name);
    
    if (!attributeNode)
        return addAttribute(path, name, value);
    
    setLiteralValue(attributeNode.value, value);
};

export const addClassName = (path, name) => {
    addAttributeValue(path, 'className', name);
};

export function getClassName(path) {
    return getAttributeValue(path, 'className');
}

export const removeClassName = (path, name) => {
    removeAttributeValue(path, 'className', name);
};

export const containsClassName = (path, className) => {
    const classNameValue = getClassName(path);
    return classNameValue.includes(className);
};

export const hasDataName = (path, value = '') => {
    const attribute = getAttributeValue(path, 'data-name');
    return attribute === value;
};

export const hasAttributeValue = (path, name, value = '') => {
    const attribute = getAttributeValue(path, name);
    return attribute === value;
};
