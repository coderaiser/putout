'use strict';

const {operator} = require('putout');
const {hasParens} = operator;

module.exports.report = () => `Remove useless parens around 'await'`;

module.exports.fix = (path) => {
    path.node.extra = {
        parenthesized: false,
    };
};

module.exports.traverse = ({push}) => ({
    AwaitExpression(path) {
        if (!hasParens(path))
            return;
        
        if (path.parentPath.isVariableDeclarator())
            push(path);
    },
});
