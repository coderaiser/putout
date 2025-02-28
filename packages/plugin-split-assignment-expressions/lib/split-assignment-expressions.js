'use strict';

const {types, operator} = require('putout');
const {replaceWithMultiple} = operator;
const {
    isAssignmentExpression,
    AssignmentExpression,
    ArrayPattern,
    isMemberExpression,
    isSequenceExpression,
} = types;

module.exports.report = () => `Split assignment expressions`;

module.exports.fix = ({path, lefts, right, merged}) => {
    if (merged) {
        const rightPath = path.get('right');
        const {right, left} = rightPath.node;
        const {object, property} = left;
        
        const assignments = [
            AssignmentExpression(lefts[0][0], lefts[0][1], object),
            AssignmentExpression(lefts[1][0], convertToArray(property), right),
        ];
        
        replaceWithMultiple(path, assignments);
        
        return;
    }
    
    const [[operator, firstLeft], ...otherLefts] = lefts;
    const assignments = [
        AssignmentExpression(operator, firstLeft, right),
    ];
    
    for (const [operator, left] of otherLefts)
        assignments.push(AssignmentExpression(operator, left, firstLeft));
    
    replaceWithMultiple(path, assignments);
};

module.exports.traverse = ({push}) => ({
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

const convertToArray = ({expressions}) => ArrayPattern(expressions);
