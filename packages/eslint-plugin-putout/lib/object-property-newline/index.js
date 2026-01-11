import {types} from 'putout';
import {isCorrectLoc} from '../common.js';

const {
    isVariableDeclarator,
    isAssignmentExpression,
    isTSTypeAliasDeclaration,
} = types;

export const category = 'destructuring';
export const report = () => 'Keep each property on separate line';

export const include = () => [
    `VariableDeclarator[init.type="ObjectExpression"]`,
    `AssignmentExpression[right.type="ObjectExpression"]`,
    `TSTypeAliasDeclaration[typeAnnotation.type="TSTypeLiteral"]`,
    `TSInterfaceDeclaration`,
];

export const filter = ({node}) => {
    const {loc, right} = node;
    
    if (isVariableDeclarator(node)) {
        const {init} = node;
        const {properties} = init;
        const {line} = loc.start;
        
        return !isCorrectLoc(line, properties);
    }
    
    if (isAssignmentExpression(node)) {
        const {properties} = right;
        const {line} = loc.start;
        
        return !isCorrectLoc(line, properties);
    }
    
    if (isTSTypeAliasDeclaration(node)) {
        const {members} = node.typeAnnotation;
        const {line} = loc.start;
        
        return !isCorrectLoc(line, members);
    }
    
    const {body} = node.body;
    const {line} = loc.start;
    
    return !isCorrectLoc(line, body);
};

export const fix = ({text}) => {
    return text
        .replace(/,(\s+)?/g, ',\n    ')
        .replace(/{/g, '{\n    ')
        .replace(/}/g, '\n}')
        .replace(/\n(\s+)?\n/g, '\n');
};
