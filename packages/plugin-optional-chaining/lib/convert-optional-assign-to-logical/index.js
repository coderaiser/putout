'use strict';

const {template, operator} = require('putout');

const {getLogical} = require('../get-logical');
const {replaceWith} = operator;

module.exports.report = () => `Use Logical Expression ('a && a.b = c') instead of Optional Chaining ('a?.b = c')`;

module.exports.fix = (path) => {
    const logical = getLogical(path, {
        assign: true,
    });
    
    const logicalNode = template.ast.fresh(logical);
    
    logicalNode.right.right = path.parentPath.node.right;
    replaceWith(path.parentPath, logicalNode);
};

module.exports.traverse = ({push, listStore}) => ({
    'OptionalMemberExpression|OptionalCallExpression'(path) {
        if (!path.parentPath.isAssignmentExpression())
            return;
        
        const rightPath = path.parentPath.get('right');
        
        if (path === rightPath)
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
