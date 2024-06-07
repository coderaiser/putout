import {types, operator} from 'putout';

const {
    isExpressionStatement,
    SequenceExpression,
} = types;

const {replaceWith} = operator;

export const report = () => 'Convert return to sequence expression';

export const fix = ({path, body, last}) => {
    const elements = [];
    
    for (const {node} of body) {
        elements.push(node.expression);
    }
    
    elements.push(last.node.argument);
    
    const sequence = SequenceExpression(elements);
    
    replaceWith(path, sequence);
};

export const traverse = ({push}) => ({
    BlockStatement: (path) => {
        if (!path.parentPath.isArrowFunctionExpression())
            return;
        
        const allBody = path.get('body');
        
        if (!allBody.length)
            return;
        
        const body = allBody.slice(0, -1);
        const last = allBody.at(-1);
        
        if (!last.isReturnStatement())
            return;
        
        for (const element of body) {
            if (!isExpressionStatement(element))
                return;
        }
        
        push({
            path,
            body,
            last,
        });
    },
});
