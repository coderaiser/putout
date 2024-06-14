'use strict';

const {types, operator} = require('putout');
const {replaceWithMultiple} = operator;
const {
    isAssignmentExpression,
    isFunction,
    AssignmentExpression,
} = types;

module.exports.report = () => `Split assignment expressions`;

module.exports.fix = ({path, lefts, right}) => {
    const assignments = [];
    
    for (const [operator, left] of lefts)
        assignments.push(AssignmentExpression(operator, left, right));
    
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
        
        if (isFunction(right))
            return;
        
        push({
            path,
            lefts,
            right,
        });
    },
});
