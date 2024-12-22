'use strict';

module.exports.report = () => `Remove useless parens around 'await'`;

module.exports.fix = (path) => {
    path.node.extra = {
        parenthesized: false,
    };
};

module.exports.traverse = ({push}) => ({
    AwaitExpression(path) {
        if (path.parentPath.isVariableDeclarator())
            push(path);
    },
});
