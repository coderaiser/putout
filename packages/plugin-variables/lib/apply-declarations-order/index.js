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
        
        for (const current of prev.filter(isVariableDeclaration)) {
            const {__c, __d} = getTemplateValues(current, 'const __c = __d');
            
            if (isIdentifier(__c))
                continue;
            
            if (compare(__b, __d))
                push({
                    current,
                    path,
                });
        }
    },
});
