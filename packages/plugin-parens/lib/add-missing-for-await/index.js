'use strict';

const {
    print,
    types,
    operator,
} = require('putout');

const {awaitExpression} = types;
const {replaceWith, addParens} = operator;

module.exports.report = (path) => {
    const line = print(path.get('argument.callee'));
    return `TypeError: '${line}' is not a function`;
};

module.exports.fix = (path) => {
    const {argument} = path.node;
    const newPath = replaceWith(path, argument);
    const objectPath = newPath.get('expression.callee.object');
    
    path = replaceWith(objectPath, awaitExpression(objectPath.node));
    
    addParens(path);
};

module.exports.traverse = ({push}) => ({
    AwaitExpression(path) {
        const argPath = path.get('argument');
        
        if (argPath.isOptionalCallExpression() && argPath.get('callee').isOptionalMemberExpression())
            push(path);
    },
});
