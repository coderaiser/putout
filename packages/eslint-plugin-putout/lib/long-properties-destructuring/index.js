import {types} from 'putout';
import {isCorrectLoc} from '../common.js';

const {
    isImportDeclaration,
    isForOfStatement,
    isIdentifier,
    isSpreadElement,
    isRestElement,
} = types;

const parseOptions = (options) => {
    const {maxLength = 15} = options[0] || {};
    
    return {
        maxLength,
    };
};

const notImportDefaultSpecifier = (a) => a.type !== 'ImportDefaultSpecifier';

export const category = 'destructuring';
export const report = () => 'Keep each property on separate lines when destructuring long properties';

export const include = () => [
    'VariableDeclarator[id.type="ObjectPattern"][id.properties.length>=2]',
    'ImportDeclaration[specifiers.length>=2]',
];

export const fix = ({text}) => {
    const end = text.indexOf('}') + 1;
    
    const startText = text
        .slice(0, end)
        .replace(/,/g, ',\n   ')
        .replace('{', '{\n    ')
        .replace('}', '\n}');
    
    const endText = text.slice(end);
    
    return `${startText}${endText}`;
};

export const filter = ({node}, options) => {
    const {parent} = node.parent;
    const {maxLength} = parseOptions(options);
    
    if (isForOfStatement(parent))
        return false;
    
    if (isImportDeclaration(node)) {
        const {specifiers} = node;
        const {line} = node.loc.start;
        const filtered = specifiers.filter(notImportDefaultSpecifier);
        const isLoc = isCorrectLoc(line, filtered);
        
        if (isLoc)
            return false;
        
        const isLength = isCorrectSpecifiersLength(specifiers, {
            maxLength,
        });
        
        return !isLength;
    }
    
    const {id} = node;
    const {properties} = id;
    const {line} = node.loc.start;
    const isLoc = isCorrectLoc(line, properties);
    
    const isLength = isCorrectPropertiesLength(properties, {
        maxLength,
    });
    
    return !isLoc && !isLength;
};

function isCorrectPropertiesLength(properties, {maxLength}) {
    for (const prop of properties) {
        if (!isIdentifier(prop.key) && !isSpreadElement(prop) && !isRestElement(prop))
            return true;
        
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
