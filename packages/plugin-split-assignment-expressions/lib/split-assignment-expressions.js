'use strict';

const {types, operator} = require('putout');
const {replaceWithMultiple} = operator;
const {
    isAssignmentExpression,
    AssignmentExpression,
} = types;

module.exports.report = () => `Split assignment expressions`;

module.exports.fix = ({path, lefts, right}) => {
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
        });
    },
});
