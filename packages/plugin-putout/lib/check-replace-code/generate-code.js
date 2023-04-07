'use strict';

const putout = require('putout');
const tryCatch = require('try-catch');
const noop = () => {};
const {
    types,
    operator,
} = putout;
const {replaceWith} = operator;

const {
    ArrayPattern,
    ObjectPattern,
    BlockStatement,
    ObjectExpression,
} = types;

module.exports = (rootPath, key) => {
    const getVar = createVarStore(rootPath);
    
    const [transformError, result] = tryCatch(putout, key, {
        fix: true,
        isTS: true,
        plugins: [
            ['generate', {
                report: noop,
                include: () => [
                    'Identifier',
                    'StringLiteral',
                ],
                fix: (path) => {
                    const {node} = path;
                    
                    const {
                        value,
                        name,
                    } = node;
                    
                    if (path.isStringLiteral() && /^__[a-z]$/.test(value)) {
                        path.node.value = getVar(name);
                        return;
                    }
                    
                    if (/^__identifier__[a-z]$/.test(name)) {
                        path.node.name = getVar(name);
                        return;
                    }
                    
                    if (/^__[a-z]$/.test(name)) {
                        path.node.name = getVar(name);
                        return;
                    }
                    
                    if (name === '__array') {
                        if (path.parentPath.isVariableDeclarator())
                            return replaceWith(path, ArrayPattern([]));
                        
                        if (path.parentPath.isCallExpression())
                            return replaceWith(path, ArrayPattern([]));
                        
                        if (path.parentPath.isFunction())
                            return replaceWith(path, ArrayPattern([]));
                        
                        if (path.parentPath.isAssignmentExpression())
                            return replaceWith(path, ArrayPattern([]));
                    }
                    
                    if (name === '__object') {
                        return objectify(path);
                    }
                    
                    if (name === '__body') {
                        replaceWith(path, BlockStatement([]));
                    }
                },
            }],
        ],
    });
    
    return [
        transformError,
        result?.code,
    ];
};

function createVarStore(path) {
    const store = {};
    
    return (name) => {
        if (store[name])
            return store[name];
        
        store[name] = path.scope.generateUid();
        
        return store[name];
    };
}

function objectify(path) {
    const {parentPath} = path;
    const isVar = parentPath.isVariableDeclarator();
    const isAssign = parentPath.isAssignmentExpression();
    
    if (isVar && parentPath.get('id') === path)
        return replaceWith(path, ObjectPattern([]));
    
    if (isAssign && parentPath.get('right') === path)
        return replaceWith(path, ObjectExpression([]));
}
