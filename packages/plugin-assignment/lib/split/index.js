import {types, operator} from 'putout';

const {
    arrayPattern,
    isAssignmentExpression,
    isMemberExpression,
    isSequenceExpression,
    assignmentExpression,
} = types;

const {replaceWithMultiple} = operator;

export const report = () => `Split assignment expressions`;

export const fix = ({path, lefts, right, merged}) => {
    if (merged) {
        const rightPath = path.get('right');
        const {right, left} = rightPath.node;
        const {object, property} = left;
        
        const assignments = [
            assignmentExpression(lefts[0][0], lefts[0][1], object),
            assignmentExpression(lefts[1][0], convertToArray(property), right),
        ];
        
        replaceWithMultiple(path, assignments);
        
        return;
    }
    
    const [[operator, firstLeft], ...otherLefts] = lefts;
    const assignments = [
        assignmentExpression(operator, firstLeft, right),
    ];
    
    for (const [operator, left] of otherLefts)
        assignments.push(assignmentExpression(operator, left, firstLeft));
    
    replaceWithMultiple(path, assignments);
};

export const traverse = ({push}) => ({
    AssignmentExpression(path) {
        const {node} = path;
        
        if (path.parentPath.isAssignmentExpression())
            return;
        
        const {operator, left} = node;
        
        let {right} = path.node;
        
        if (!isAssignmentExpression(right))
            return;
        
        const merged = isMemberExpression(right.left) && isSequenceExpression(right.left.property);
        
        const lefts = [
            [operator, left],
            [right.operator, right.left],
        ];
        
        while (right = right.right) {
            if (!isAssignmentExpression(right))
                break;
            
            const {left, operator} = right;
            lefts.push([operator, left]);
        }
        
        push({
            path,
            lefts,
            right,
            merged,
        });
    },
});

const convertToArray = ({expressions}) => arrayPattern(expressions);
