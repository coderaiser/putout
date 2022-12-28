'use strict';

const {
    types,
    operator,
} = require('putout');

const {
    replaceWithMultiple,
    toExpression,
    compare,
} = operator;

const {
    ReturnStatement,
    BlockStatement,
    ExpressionStatement,
} = types;

module.exports.report = () => 'Avoid sequence expressions';

module.exports.fix = (path) => {
    const {parentPath} = path;
    
    if (isArgs(path)) {
        path.parentPath.node.arguments = path.node.expressions;
        return;
    }
    
    if (isFn(path)) {
        const expressions = parentPath.node.body.expressions.map(toExpression);
        const n = expressions.length - 1;
        const {expression} = expressions[n];
        
        expressions[n] = ReturnStatement(expression);
        parentPath.node.body = BlockStatement(expressions);
        
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
    
    if (isIfTest(path)) {
        while (path.node.expressions.length > 1) {
            path.parentPath.insertBefore(ExpressionStatement(path.node.expressions.shift()));
        }
        
        return;
    }
    
    const isExpressionAfterCall = compare(path, '__a(__args), __b');
    const callPath = path.get('expressions.0');
    const argPath = path.get('expressions.1');
    
    if (isExpressionAfterCall && argPath.isLiteral()) {
        callPath.node.arguments.push(argPath.node);
        argPath.remove();
        
        return;
    }
    
    return replaceWithMultiple(path, path.node.expressions);
};

const isBlock = ({parentPath}) => parentPath.isBlockStatement();
const isFn = ({parentPath}) => parentPath.isArrowFunctionExpression();
const isExpr = ({parentPath}) => parentPath.isExpressionStatement();
const isRet = ({parentPath}) => parentPath.isReturnStatement();

module.exports.traverse = ({push}) => ({
    SequenceExpression(path) {
        if (isBlock(path) || isFn(path) || isExpr(path) || isCallee(path) || isRet(path)) {
            push(path);
            return;
        }
        
        if (isArgs(path)) {
            push(path);
            return;
        }
        
        if (isIfTest(path)) {
            push(path);
        }
    },
});

function isCallee(path) {
    const {parentPath} = path;
    const isCall = parentPath.isCallExpression();
    const isSame = parentPath.get('callee') === path;
    
    return isCall && isSame;
}

function isIfTest(path) {
    const {parentPath} = path;
    const pathTest = parentPath.get('test');
    
    if (!parentPath.isIfStatement())
        return false;
    
    return pathTest === path;
}

function isArgs(path) {
    const {parentPath} = path;
    
    if (!parentPath.isCallExpression())
        return false;
    
    return path === parentPath.get('arguments.0');
}
