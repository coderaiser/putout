'use strict';

const {
    operator,
    types,
} = require('putout');

const {
    isRestElement,
    isImportDeclaration,
    isVariableDeclarator,
    isAssignmentPattern,
} = types;

const NewLinesReg = /([\s,]+)?\n(\s+)?/g;
const AssignRegExp = /{\n?.*=.*\n?.*}/;

const {
    compare,
} = operator;

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep curly braces on one line when you have one destructuring property';

module.exports.include = () => [
    'VariableDeclarator[id.type="ObjectPattern"][id.properties.length=1]',
    'ImportDeclaration[specifiers.length=1]',
];

module.exports.filter = ({node, text, getText, getCommentsInside}) => {
    if (getCommentsInside(node).length)
        return false;
    
    const parentText = getText(node.parent);
    
    if (isImportDeclaration(node) && !compare(node.specifiers[0].local, node.specifiers[0].imported))
        return false;
    
    if (isImportDeclaration(node) && /import {\n/.test(text))
        return true;
    
    if (AssignRegExp.test(parentText))
        return false;
    
    if (isVariableDeclarator(node) && /(const|let|var) {\n/.test(parentText)) {
        const [property] = node.id.properties;
        const {value} = property;
        
        if (isAssignmentPattern(value))
            return false;
        
        return true;
    }
    
    return false;
};

module.exports.fix = ({text, node, getText}) => {
    if (isImportDeclaration(node)) {
        return text.replace(NewLinesReg, '');
    }
    
    const {id} = node;
    const idText = getText(id);
    const [property] = id.properties;
    
    if (isRestElement(property)) {
        const {name} = property.argument;
        return text.replace(idText, `{...${name}}`);
    }
    
    const {key, value} = property;
    
    if (key.name === value.name)
        return text.replace(idText, `{${key.name}}`);
    
    return text.replace(idText, `{${key.name}: ${value.name}}`);
};

