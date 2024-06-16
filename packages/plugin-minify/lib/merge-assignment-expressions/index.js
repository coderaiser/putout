import {operator, types} from 'putout';

const {compare, remove} = operator;
const {
    isAssignmentExpression,
    AssignmentExpression,
} = types;

export const report = () => `Merge assignment expressions`;

export const fix = ({path, lefts}) => {
    const {operator, right} = path.node;
    let currentRight = right;
    
    for (const [currentLeft, currentPath] of lefts.reverse()) {
        currentRight = AssignmentExpression(operator, currentLeft, currentRight);
        remove(currentPath);
    }
    
    path.node.right = currentRight;
};

export const traverse = ({push}) => ({
    AssignmentExpression(path) {
        const {parentPath} = path;
        const {right} = path.node;
        const lefts = [];
        
        let next = parentPath.getNextSibling();
        
        while (next.node) {
            const {expression} = next.node;
            
            if (!isAssignmentExpression(expression))
                break;
            
            if (!compare(right, expression.right))
                break;
            
            lefts.push([expression.left, next]);
            next = next.getNextSibling();
        }
        
        if (!lefts.length)
            return;
        
        push({
            path,
            lefts,
        });
    },
});
