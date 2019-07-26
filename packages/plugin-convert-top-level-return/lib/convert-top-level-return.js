'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;

const {
    CallExpression,
    MemberExpression,
    Identifier,
} = types;

module.exports.report = () => `"process.exit" should be used instead of top-level return`;

module.exports.fix = (path) => {
    replaceWith(path, CallExpression(
        MemberExpression(
            Identifier('process'),
            Identifier('exit')
        ),
        []
    ));
};

const isRoot = (path) => path.isFunction();

module.exports.traverse = ({push}) => {
    return {
        ReturnStatement(path) {
            const fnPath = path.findParent(isRoot);
            
            if (!fnPath)
                return push(path);
        },
    };
};

