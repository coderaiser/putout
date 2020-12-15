'use strict';

const {types, operator} = require('putout');

const {replaceWith} = require('putout').operator;

const {AwaitExpression} = types;
const {traverse} = operator;

module.exports.report = () => 'Async functions should be used';

module.exports.exclude = () => [
    'await run(__args)',
    '() => run(__a)',
    '() => run(__a, __b)',
];

module.exports.replace = () => ({
    'run(__args)': (vars, path) => {
        traverse(path, {
            'run(__args)'(path) {
                replaceWith(path, AwaitExpression(path.node));
                path.stop();
            },
        });
        
        path.scope.block.async = true;
        return 'await run(__args)';
    },
});

