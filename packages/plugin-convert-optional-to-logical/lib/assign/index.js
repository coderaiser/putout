'use strict';

const {template, operator} = require('putout');
const {replaceWith} = operator;
const {getLogical} = require('../get-logical');

module.exports.report = () => `Use Logical Expression ('a && a.b = c') instead of Optional Chaining ('a?.b = c')`;

module.exports.fix = (path) => {
    const logical = getLogical(path, {
        assign: true,
    });
    
    const logicalNode = template.ast(logical);
    
    logicalNode.right.right = path.parentPath.node.right;
    replaceWith(path.parentPath, logicalNode);
};

module.exports.traverse = ({push, listStore}) => ({
    'OptionalMemberExpression|OptionalCallExpression'(path) {
        if (!path.parentPath.isAssignmentExpression())
            return;
        
        listStore(path);
    },
    Program: {
        exit() {
            for (const path of listStore().reverse())
                push(path);
        },
    },
});
