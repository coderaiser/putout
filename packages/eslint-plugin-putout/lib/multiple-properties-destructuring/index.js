'use strict';

const {isImportDeclaration} = require('putout').types;
const {parseImportSpecifiers} = require('parse-import-specifiers');

const {
    isCorrectLoc,
    isCorrectImportLoc,
} = require('../common');

module.exports.category = 'destructuring';
module.exports.report = () => 'Keep each property on separate lines when using multiple destructuring properties';

const parseOptions = (options) => {
    const {minProperties = 2} = options[0] || {};
    
    return {
        minProperties,
    };
};

module.exports.include = ({options}) => {
    const {minProperties} = parseOptions(options);
    
    return [
        `VariableDeclarator[id.type="ObjectPattern"][id.properties.length>${minProperties}]`,
        `ImportDeclaration[specifiers.length>=${minProperties}]`,
    ];
};

module.exports.filter = ({node}, options) => {
    const {minProperties} = parseOptions(options);
    const {line} = node.loc.start;
    
    const {
        id,
        specifiers,
        parent,
    } = node;
    
    if (isImportDeclaration(node)) {
        const {defaults, imports} = parseImportSpecifiers(node.specifiers);
        
        if (defaults.length === 1 && imports.length < minProperties)
            return false;
        
        return !isCorrectImportLoc(line, specifiers);
    }
    
    if (parent.parent && parent.parent.type === 'ForOfStatement')
        return false;
    
    const {properties} = id;
    
    return !isCorrectLoc(line, properties);
};

module.exports.fix = ({text}) => {
    return text
        .replace(/,/g, ',\n')
        .replace('{', '{\n')
        .replace('}', '\n}')
        .replace(/\n\s*?\n/g, '\n');
};
