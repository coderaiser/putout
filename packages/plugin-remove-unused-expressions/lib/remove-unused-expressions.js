import {types, operator} from 'putout';

const {
    remove,
    isSimple,
    createTypeChecker,
} = operator;

const {
    isReturnStatement,
    isBlockStatement,
    isImportDeclaration,
    isIdentifier,
    isStringLiteral,
} = types;

export const report = () => 'Avoid unused expression statements';

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    DirectiveLiteral(path) {
        if (path.node.value === 'use strict')
            return;
        
        if (path.node.value === 'use client')
            return;
        
        push(path.parentPath);
    },
    ExpressionStatement(path) {
        if (isSkip(path))
            return;
        
        if (isUnused(path))
            push(path.get('expression'));
    },
});

function isUselessNot(statementPath) {
    const path = statementPath.get('expression');
    
    if (!path.isUnaryExpression({operator: '!'}))
        return false;
    
    return !isIIFE(path);
}

function isIIFE(path) {
    const argPath = path.get('argument');
    
    if (!argPath.isCallExpression())
        return false;
    
    const calleePath = argPath.get('callee');
    
    return calleePath.isFunction();
}

function isNotDirectiveLiteral(statementPath) {
    const path = statementPath.get('expression');
    
    if (!path.isLiteral())
        return false;
    
    if (!path.isStringLiteral({value: 'use strict'}))
        return true;
    
    const {parentPath} = path;
    const isDirective = parentPath === parentPath.parentPath.get('body.0');
    
    return !isDirective;
}

function isUselessLogical(statementPath) {
    const path = statementPath.get('expression');
    
    if (!path.isLogicalExpression())
        return false;
    
    const left = path.get('left');
    const right = path.get('right');
    
    return isSimple(left) && isSimple(right);
}

const isSkip = createTypeChecker([
    ['+', isPrevReturnWithoutArg],
    ['+', isImportAssert],
]);

const isUnused = createTypeChecker([
    ['+', isUselessLogical],
    ['+: node.expression -> Identifier'],
    ['+: node.expression -> ObjectExpression'],
    ['+: node.expression -> ArrayExpression'],
    ['+: node.expression -> MemberExpression'],
    ['+', isNotDirectiveLiteral],
    ['+', isUselessNot],
]);

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

function isImportAssert(path) {
    const {expression} = path.node;
    
    if (isIdentifier(expression, {name: 'assert'})) {
        const prev = path.getPrevSibling();
        return isImportDeclaration(prev);
    }
    
    return isStringLiteral(expression, {
        value: 'json',
    });
}
