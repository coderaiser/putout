'use strict';

const {operator} = require('putout');
const {entries} = Object;
const {remove, replaceWith} = operator;

module.exports.report = () => `Inline expressions`;

module.exports.fix = ({path, statement}) => {
    replaceWith(statement, path);
    remove(path);
};

module.exports.traverse = ({push}) => ({
    'Program|BlockStatement'(path) {
        for (const [, bind] of entries(path.scope.bindings)) {
            const [unary, statement] = bind.referencePaths;
            
            const unaryParent = unary?.parentPath;
            const statementParent = statement?.parentPath.parentPath;
            
            if (!unaryParent?.isUpdateExpression())
                return;
            
            if (!statementParent?.isStatement())
                return;
            
            push({
                path: unary.parentPath,
                statement,
            });
        }
    },
});
