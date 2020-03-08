'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    UnaryExpression,
    isArrowFunctionExpression,
    isFunctionExpression,
    isFunctionDeclaration,
    isObjectMethod,
    isClassMethod,
    isCatchClause,
    isIfStatement,
    isTryStatement,
} = types;

module.exports.report = () => 'Empty block statement';

module.exports.fix = (path) => {
    const alternatePath = path.get('alternate');
    const testPath = path.get('test');
    const {alternate} = path.node;
    
    if (!path.isIfStatement())
        return path.remove();
    
    if (!alternate) {
        if (!testPath.isBinaryExpression() && !testPath.isLiteral())
            return replaceWith(path, testPath);
        
        return path.remove();
    }
    
    if (alternatePath.isBlock() && !alternate.body.length) {
        path.node.alternate = null;
        return;
    }
    
    if (alternatePath.isIfStatement())
        return replaceWith(path, alternatePath);
    
    path.node.consequent = path.node.alternate;
    path.node.alternate = null;
    
    const {operator} = testPath.node;
    
    if (operator && operator !== '=' && /[<>=!]/.test(testPath.node.operator)) {
        testPath.node.operator = reverse(testPath.node.operator);
        return;
    }
    
    replaceWith(testPath, UnaryExpression('!', testPath.node));
};

module.exports.traverse = ({push}) => {
    return {
        BlockStatement(path) {
            const {
                node,
                parentPath,
            } = path;
            
            const {body} = node;
            
            if (body.length)
                return;
            
            const parentNode = parentPath.node;
            
            if (isFunction(parentNode))
                return;
            
            if (isCatchClause(parentNode))
                return;
            
            if (isTryStatement(parentNode))
                return push(parentPath);
            
            if (blockIsConsequent(node, parentNode))
                return push(parentPath);
            
            if (blockIsAlternate(node, parentNode))
                return push(parentPath);
            
            if (blockIsBody(node, parentNode))
                return push(parentPath);
            
            if (blockIsIndependentBody(node, parentNode))
                return push(path);
        },
    };
};

function isFunction(node) {
    return isArrowFunctionExpression(node)
    || isFunctionExpression(node)
    || isFunctionDeclaration(node)
    || isObjectMethod(node)
    || isClassMethod(node);
}

function blockIsBody(node, parentNode) {
    const {body} = parentNode;
    return body === node;
}

function blockIsIndependentBody(node, parentNode) {
    const {body} = parentNode;
    
    if (!body)
        return false;
    
    return body[0] === node;
}

function blockIsConsequent(node, parentNode) {
    if (!isIfStatement(parentNode))
        return;
    
    return parentNode.consequent === node;
}

function blockIsAlternate(node, parentNode) {
    const {alternate} = parentNode;
    
    if (!isIfStatement(parentNode))
        return;
    
    if (alternate.comments)
        return false;
    
    return alternate === node;
}

function reverse(a) {
    switch(a) {
    case '>':
        return '<=';
    
    case '<':
        return '>=';
    
    case '<=':
        return '>';
    
    case '>=':
        return '<';
    
    case '!':
        return '';
    
    case '!=':
        return '==';
    
    case '!==':
        return '===';
    
    default:
        return `!${a}`.replace('=', '');
    }
}

