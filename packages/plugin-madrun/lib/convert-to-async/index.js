'use strict';

const {types, operator} = require('putout');

const {replaceWith, traverse} = operator;

const {
    isStringLiteral,
    awaitExpression,
} = types;

module.exports.report = () => 'Use async function';

module.exports.exclude = () => [
    'await run(__args)',
    '() => run(__a)',
];

module.exports.match = () => ({
    'run(__args)': ({__args}, path) => {
        if (!path.parentPath.isFunction())
            return true;
        
        for (const arg of __args) {
            if (!isStringLiteral(arg))
                return true;
        }
        
        return false;
    },
});

module.exports.replace = () => ({
    'run(__args)': (vars, path) => {
        traverse(path, {
            'run(__args)'(path) {
                replaceWith(path, awaitExpression(path.node));
                path.stop();
            },
        });
        
        path.scope.block.async = true;
        return 'await run(__args)';
    },
});
