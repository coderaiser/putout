'use strict';

const {
    types,
    operator,
} = require('putout');

const {
    replaceWithMultiple,
    toExpression,
} = operator;

const {
    ReturnStatement,
    BlockStatement,
    isAwaitExpression,
} = types;

module.exports.report = () => 'sequence expressions should not be used';

module.exports.fix = (path) => {
    const {parentPath} = path;
    
    if (isFn(path)) {
        const expressions = parentPath.node.body.expressions.map(toExpression);
        const n = expressions.length - 1;
        const {expression} = expressions[n];
        
        expressions[n] = ReturnStatement(expression);
        parentPath.node.body = BlockStatement(expressions);
        return;
    }
    
    if (isCallee(path)) {
        const expressions = path.node.expressions.map(toExpression);
        const {expression} = expressions.pop();
        
        parentPath.insertBefore(expressions);
        parentPath.node.callee = expression;
        return;
    }
    
    if (isRet(path)) {
        const {expressions} = path.node;
        const argument = expressions.pop();
        
        replaceWithMultiple(parentPath, [
            ...expressions,
            ReturnStatement(argument),
        ]);
        return;
    }
    
    return replaceWithMultiple(path, path.node.expressions);
};

const isBlock = ({parentPath}) => parentPath.isBlockStatement();
const isFn = ({parentPath}) => parentPath.isArrowFunctionExpression();
const isExpr = ({parentPath}) => parentPath.isExpressionStatement();
const isRet = ({parentPath}) => parentPath.isReturnStatement();

module.exports.traverse = ({push}) => {
    return {
        SequenceExpression(path) {
            if (containsAwait(path))
                return;
            
            if (isBlock(path) || isFn(path) || isExpr(path) || isCallee(path) || isRet(path))
                push(path);
        },
    };
};

function containsAwait({node}) {
    const {expressions} = node;
    return expressions.some(isAwaitExpression);
}

function isCallee(path) {
    const {parentPath} = path;
    const isCall = parentPath.isCallExpression();
    const isSame = parentPath.get('callee') === path;
    
    return isCall && isSame;
}

