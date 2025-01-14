'use strict';

const {types, operator} = require('putout');
const {remove, isSimple} = operator;
const {
    isReturnStatement,
    isBlockStatement,
} = types;

module.exports.report = () => 'Avoid unused expression statements';

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    DirectiveLiteral(path) {
        if (path.node.value === 'use strict')
            return;
        
        if (path.node.value === 'use client')
            return;
        
        push(path.parentPath);
    },
    ExpressionStatement(path) {
        const expressionPath = path.get('expression');
        
        if (isPrevReturnWithoutArg(path))
            return;
        
        if (isUselessLogical(expressionPath))
            return push(expressionPath);
        
        if (expressionPath.isIdentifier())
            return push(expressionPath);
        
        if (expressionPath.isObjectExpression())
            return push(expressionPath);
        
        if (expressionPath.isArrayExpression())
            return push(expressionPath);
        
        if (expressionPath.isMemberExpression())
            return push(expressionPath);
        
        if (isNotDirectiveLiteral(expressionPath))
            return push(expressionPath);
        
        if (expressionPath.isUnaryExpression({operator: '!'}) && !isIIFE(expressionPath))
            return push(expressionPath);
    },
});

function isIIFE(path) {
    const argPath = path.get('argument');
    
    if (!argPath.isCallExpression())
        return false;
    
    const calleePath = argPath.get('callee');
    
    return calleePath.isFunction();
}

function isNotDirectiveLiteral(path) {
    if (!path.isLiteral())
        return false;
    
    if (!path.isStringLiteral({value: 'use strict'}))
        return true;
    
    const {parentPath} = path;
    const isDirective = parentPath === parentPath.parentPath.get('body.0');
    
    return !isDirective;
}

function isUselessLogical(path) {
    if (!path.isLogicalExpression())
        return false;
    
    const left = path.get('left');
    const right = path.get('right');
    
    return isSimple(left) && isSimple(right);
}

function isPrevReturnWithoutArg(path) {
    const prevPath = path.getPrevSibling();
    
    if (isReturnStatement(prevPath))
        return !prevPath.node.argument;
    
    const {parentPath} = path;
    
    if (parentPath.isLabeledStatement()) {
        const blockPath = parentPath.parentPath;
        
        if (isBlockStatement(blockPath))
            return isPrevReturnWithoutArg(blockPath);
    }
    
    return false;
}
