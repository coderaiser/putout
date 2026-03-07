import {operator, types} from 'putout';

const {
    isStringLiteral,
    isArrayExpression,
    isIdentifier,
    isCallExpression,
    arrayExpression,
    stringLiteral,
} = types;

const {replaceWith} = operator;

export const report = (path) => {
    return `Add missing tuple around: ${path}`;
};

export const fix = (path) => {
    const {node} = path;
    
    if (isIdentifier(path) || isCallExpression(path)) {
        replaceWith(path, arrayExpression([stringLiteral('+'), node]));
        return;
    }
    
    replaceWith(path, arrayExpression([node]));
};

export const traverse = ({push}) => ({
    ArrayExpression(path) {
        const {parentPath} = path;
        
        if (!isCallExpression(parentPath))
            return;
        
        if (!isIdentifier(parentPath.node.callee, {name: 'createTypeChecker'}))
            return;
        
        const elements = path.get('elements');
        
        if (isConsistent(elements))
            return;
        
        for (const element of elements) {
            if (!isArrayExpression(element))
                push(element);
        }
    },
});

function isConsistent(elements) {
    const arraysCount = elements.filter(isArrayExpression).length;
    
    if (elements.length === arraysCount)
        return true;
    
    const stringsCount = elements.filter(isStringLiteral).length;
    
    if (elements.length === stringsCount)
        return true;
    
    const identifiersCount = elements.filter(isIdentifier).length;
    
    return elements.length === identifiersCount;
}
