'use strict';

const putout = require('putout');
const tryCatch = require('try-catch');
const noop = () => {};

const {types, operator} = putout;
const {replaceWith} = operator;

const {
    ArrayPattern,
    BlockStatement,
    ObjectExpression,
    ObjectPattern,
} = types;

module.exports = (rootPath, key) => {
    const getVar = createVarStore(rootPath);
    
    const [transformError, result] = tryCatch(putout, key, {
        printer: 'putout',
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
                    
                    const {value, name} = node;
                    
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
                    
                    if (/__args/.test(name)) {
                        path.node.name = getVar(name);
                        return;
                    }
                    
                    if (name === '__array') {
                        if (path.parentPath.isCallExpression())
                            return replaceWith(path, ArrayPattern([]));
                        
                        if (path.parentPath.isFunction())
                            return replaceWith(path, ArrayPattern([]));
                    }
                    
                    if (name === '__object')
                        return objectify(path);
                    
                    if (name === '__body')
                        replaceWith(path, BlockStatement([]));
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
    const isAssign = parentPath.isAssignmentExpression();
    const isVar = parentPath.isVariableDeclarator();
    
    if (path.parentPath.isExportDeclaration())
        return replaceWith(path, ObjectExpression([]));
    
    if (path.parentPath.isCallExpression())
        return replaceWith(path, ObjectExpression([]));
    
    if (isAssign && parentPath.get('right') === path)
        return replaceWith(path, ObjectExpression([]));
    
    if (isVar && parentPath.get('id') === path)
        return replaceWith(path, ObjectPattern([]));
}
