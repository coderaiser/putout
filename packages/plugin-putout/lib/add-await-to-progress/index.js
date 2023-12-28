'use strict';

const {operator} = require('putout');
const {remove, compare} = operator;

module.exports.report = () => `Add 'await' to operator 'progress()'`;

module.exports.match = () => ({
    'progress(__args)': (vars, path) => !path.parentPath.isAwaitExpression(),
});

module.exports.replace = () => ({
    'progress(__args)': (vars, path) => {
        path.scope.block.async = true;
        return 'await progress(__args)';
    },
    't.progress(__args)': (vars, path) => {
        const next = path.parentPath.getNextSibling();
        
        if (compare(next, 't.end()'))
            remove(next);
        
        const {params} = path.scope.block;
        const [first] = params;
        
        if (first.name === 't')
            path.scope.block.params = [];
        
        path.scope.block.async = true;
        return 'await progress(__args)';
    },
});
