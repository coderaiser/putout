import {types, operator} from 'putout';

const {replaceWith} = operator;
const {yieldExpression} = types;

const DELEGATE = true;

export const report = () => `Add missing '*' in generator function`;

export const fix = (path) => {
    const fnPath = path.getFunctionParent();
    
    fnPath.node.generator = true;
    
    if (path.parentPath.isExpressionStatement()) {
        const next = path.parentPath.getNextSibling();
        
        if (!next.node)
            return;
    }
    
    const {parentPath} = path;
    const {right} = parentPath.node;
    
    replaceWith(parentPath, yieldExpression(right, DELEGATE));
};

export const traverse = ({push}) => ({
    YieldExpression(path) {
        const fnPath = path.getFunctionParent();
        
        if (!fnPath.node.generator)
            push(path);
    },
    Identifier(path) {
        if (path.node.name !== 'yield')
            return;
        
        if (path.parentPath.isBinaryExpression({operator: '*'})) {
            push(path);
            return;
        }
    },
});
