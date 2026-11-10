import {types} from 'putout';

const {
    isArrayExpression,
    isStringLiteral,
    isIdentifier,
    isCallExpression,
} = types;

export const report = () => `Success path ('+') is absent in Type Checker, all branches routes to fail ('-')`;

export const fix = () => {};

export const traverse = ({push}) => ({
    ArrayExpression(path) {
        const {parentPath} = path;
        
        if (!isCallExpression(parentPath))
            return;
        
        const {callee} = parentPath.node;
        
        if (!isIdentifier(callee, {name: 'createTypeChecker'}))
            return;
        
        const {elements} = path.node;
        const results = elements.map(getResult);
        const successes = results.filter(Boolean);
        
        if (!successes.length)
            push(path);
    },
});

const getResult = (a) => {
    if (isStringLiteral(a)) {
        const {value} = a;
        
        if (value.startsWith('-'))
            return false;
    }
    
    if (isArrayExpression(a)) {
        const {value} = a.elements[0];
        
        if (value.startsWith('-'))
            return false;
    }
    
    return true;
};
