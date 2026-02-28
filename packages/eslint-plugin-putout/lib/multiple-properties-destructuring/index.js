import {types} from 'putout';
import {parseImportSpecifiers} from 'parse-import-specifiers';
import {
    isCorrectLoc,
    isCorrectImportLoc,
} from '../common.js';

const {isImportDeclaration} = types;

export const category = 'destructuring';
export const report = () => 'Keep each property on separate lines when using multiple destructuring properties';

const parseOptions = (options) => {
    const {minProperties = 2} = options[0] || {};
    
    return {
        minProperties,
    };
};

export const include = ({options}) => {
    const {minProperties} = parseOptions(options);
    
    return [
        `VariableDeclarator[id.type="ObjectPattern"][id.properties.length>${minProperties}]`,
        `ImportDeclaration[specifiers.length>${minProperties}]`,
    ];
};

export const filter = ({node}, {options}) => {
    const {minProperties} = parseOptions(options);
    const {line} = node.loc.start;
    
    const {
        id,
        specifiers,
        parent,
    } = node;
    
    if (isImportDeclaration(node)) {
        const {defaults, imports} = parseImportSpecifiers(node.specifiers);
        
        if (defaults.length === 1 && imports.length <= minProperties)
            return false;
        
        return !isCorrectImportLoc(line, specifiers);
    }
    
    if (parent.parent && parent.parent.type === 'ForOfStatement')
        return false;
    
    const {properties} = id;
    
    return !isCorrectLoc(line, properties);
};

export const fix = ({text}) => {
    return text
        .replace(/,/g, ',\n')
        .replace('{', '{\n')
        .replace('}', '\n}')
        .replace(/\n\s*?\n/g, '\n');
};
