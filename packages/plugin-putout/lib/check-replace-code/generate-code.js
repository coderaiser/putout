'use strict';

const putout = require('putout');
const tryCatch = require('try-catch');

const {types, operator} = putout;
const {replaceWith} = operator;
const {
    ArrayPattern,
    ObjectPattern,
    BlockStatement,
} = types;

module.exports = (rootPath, key) => {
    const getVar = createVarStore(rootPath);
    const [transformError, result] = tryCatch(putout, key, {
        fix: true,
        isTS: true,
        plugins: [
            ['generate', {
                report: () => {},
                include: () => [
                    'Identifier',
                ],
                fix: (path) => {
                    const {name} = path.node;
                    
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
                        if (path.parentPath.isVariableDeclarator())
                            replaceWith(path, ObjectPattern([]));
                        
                        return;
                    }
                    
                    if (name === '__body') {
                        replaceWith(path, BlockStatement([]));
                    }
                },
            }],
        ],
    });
    
    return [transformError, result?.code];
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

