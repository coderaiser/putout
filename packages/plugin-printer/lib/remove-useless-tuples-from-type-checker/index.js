import {operator, types} from 'putout';

const {
    isStringLiteral,
    isArrayExpression,
    isIdentifier,
    isCallExpression,
} = types;

const {replaceWith} = operator;

export const report = (path) => {
    return `Remove useless tuple from: ${path}`;
};

export const fix = (path) => {
    const [element] = path.node.elements;
    replaceWith(path, element);
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
            if (isArrayExpression(element))
                push(element);
        }
    },
});

const isTwoElementTuple = (a) => {
    if (!isArrayExpression(a))
        return false;
    
    return a.node.elements.length === 2;
};

function isConsistent(elements) {
    const stringsCount = elements.filter(isStringLiteral).length;
    
    if (elements.length === stringsCount)
        return true;
    
    const identifiersCount = elements.filter(isIdentifier).length;
    
    if (elements.length === identifiersCount)
        return true;
    
    return elements.filter(isTwoElementTuple).length;
}
