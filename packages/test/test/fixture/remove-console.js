import {types} from '@putout/babel';
import {operator} from 'putout';

const {remove} = operator;

const {
    isIdentifier,
    isLiteral,
    isMemberExpression,
} = types;

export const report = () => `Avoid 'console' call`;

export const fix = (path) => {
    remove(path);
};

export const find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        CallExpression(path) {
            const {callee} = path.node;
            
            if (!isMemberExpression(callee))
                return;
            
            const {object, property} = callee;
            const isObject = isIdentifier(object, {
                name: 'console',
            });
            
            if (!isObject)
                return;
            
            const isPropertyIdentifier = isOneOfIdentifiers(property, ['log', 'error', 'warn']);
            
            const isPropertyLiteral = isOneOfLiterals(property, ['log', 'error', 'warn']);
            
            if (!isPropertyIdentifier && !isPropertyLiteral)
                return;
            
            if (path.scope.hasBinding('console'))
                return;
            
            places.push(path);
        },
    });
    
    return places;
};

function isOneOfIdentifiers(node, array) {
    for (const name of array)
        if (isIdentifier(node, {name}))
            return true;
    
    return false;
}

function isOneOfLiterals(node, array) {
    for (const value of array)
        if (isLiteral(node, {value}))
            return true;
    
    return false;
}
