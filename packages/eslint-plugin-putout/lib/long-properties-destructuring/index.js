'use strict';

const {types} = require('putout');
const {isCorrectLoc} = require('../common');
const {
    isImportDeclaration,
    isForOfStatement,
} = types;

const parseOptions = (options) => {
    const {maxLength = 15} = options[0] || {};
    
    return {
        maxLength,
    };
};

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep each property on separate lines when destructuring long properties';

module.exports.include = () => [
    'VariableDeclarator[id.type="ObjectPattern"][id.properties.length>=2]',
    'ImportDeclaration[specifiers.length>=2]',
];

module.exports.fix = ({text}) => {
    const end = text.indexOf('}') + 1;
    
    const startText = text
        .slice(0, end)
        .replace(/,/g, ',\n   ')
        .replace('{', '{\n    ')
        .replace('}', '\n}');
    
    const endText = text.slice(end);
    
    return `${startText}${endText}`;
};

module.exports.filter = ({node}, options) => {
    const {parent} = node.parent;
    const {maxLength} = parseOptions(options);
    
    if (isForOfStatement(parent))
        return false;
    
    if (isImportDeclaration(node)) {
        const {specifiers} = node;
        const {line} = node.loc.start;
        const isLoc = isCorrectLoc(line, specifiers);
        
        const isLength = isCorrectSpecifiersLength(specifiers, {
            maxLength,
        });
        
        return !(isLoc || isLength);
    }
    
    const {id} = node;
    const {properties} = id;
    const {line} = node.loc.start;
    const isLoc = isCorrectLoc(line, properties);
    
    const isLength = isCorrectPropertiesLength(properties, {
        maxLength,
    });
    
    return !(isLoc || isLength);
};

function isCorrectPropertiesLength(properties, {maxLength}) {
    for (const prop of properties) {
        const {name} = prop.key || prop.argument;
        
        if (name.length >= maxLength)
            return false;
    }
    
    return true;
}

function isCorrectSpecifiersLength(specifiers, {maxLength}) {
    for (const {imported} of specifiers) {
        if (!imported)
            continue;
        
        const {name} = imported;
        
        if (name.length >= maxLength)
            return false;
    }
    
    return true;
}
