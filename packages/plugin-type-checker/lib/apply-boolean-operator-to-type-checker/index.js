import {operator, types} from 'putout';

const {
    compare,
    setLiteralValue,
} = operator;

const {
    isArrayExpression,
    isIdentifier,
    isCallExpression,
} = types;

export const report = ({operator}) => `Apply boolean operator: '${operator}'`;

export const fix = ({path, operator}) => {
    const [first] = path.node.elements;
    const {value} = first;
    
    setLiteralValue(first, `${value} -> ${operator}`);
    path.node.elements.pop();
};

export const traverse = ({push}) => ({
    ArrayExpression(path) {
        const {parentPath} = path;
        
        if (!isCallExpression(parentPath))
            return;
        
        const {callee} = parentPath.node;
        
        if (!isIdentifier(callee, {name: 'createTypeChecker'}))
            return;
        
        const elements = path.get('elements');
        
        for (const element of elements) {
            if (!isArrayExpression(element))
                continue;
            
            const [, checker] = element.get('elements');
            
            if (!checker)
                return;
            
            if (isIdentifier(checker.node, {name: 'Boolean'}))
                push({
                    operator: '+',
                    path: element,
                });
            
            if (compare(checker.node, 'not(Boolean)'))
                push({
                    operator: '-',
                    path: element,
                });
        }
    },
});
