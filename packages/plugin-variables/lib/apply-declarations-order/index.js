import {types, operator} from 'putout';

const {
    insertAfter,
    remove,
    compare,
    getTemplateValues,
} = operator;

const {
    isVariableDeclaration,
    isIdentifier,
    isCallExpression,
    isObjectPattern,
} = types;

export const report = () => `Apply declarations order`;

export const fix = ({path, current}) => {
    const {node} = current;
    remove(current);
    insertAfter(path, node);
};

export const traverse = ({push}) => ({
    'const __a = __b': (path) => {
        const {__a, __b} = getTemplateValues(path, 'const __a = __b');
        
        if (!isIdentifier(__a))
            return;
        
        if (!isCallExpression(__b))
            return;
        
        const prev = path.getAllPrevSiblings();
        
        for (const current of prev.filter(isObjectDestructuring)) {
            const {__d} = getTemplateValues(current, 'const __c = __d');
            
            if (compare(__b, __d))
                push({
                    current,
                    path,
                });
        }
    },
});

function isObjectDestructuring(path) {
    if (!isVariableDeclaration(path))
        return false;
    
    return isObjectPattern(path.node.declarations[0].id);
}
