'use strict';

const {types, operator} = require('putout');
const {
    objectProperty,
    objectPattern,
    identifier,
} = types;

const {remove, compare} = operator;
const isInsideTest = ({parentPath}) => compare(parentPath, 'test(__a, __b)');

const checkAwait = (vars, path) => {
    if (!path.find(isInsideTest))
        return false;
    
    return !path.parentPath.isAwaitExpression();
};

module.exports.report = () => `Add 'await' to operator 'progress()'`;

module.exports.match = () => ({
    'progress(__args)': checkAwait,
    't.progress(__args)': checkAwait,
});

module.exports.replace = () => ({
    'test(__a, async (t, {progress}) => __body)': 'test(__a, async ({progress}) => __body)',
    'progress(__args)': addAwait,
    't.progress(__args)': addAwait,
});

function addAwait(vars, path) {
    const next = path.parentPath.getNextSibling();
    
    if (compare(next, 't.end()'))
        remove(next);
    
    const {params} = path.scope.block;
    const [first] = params;
    
    if (first.name === 't') {
        const id = identifier('progress');
        
        path.scope.block.params = [
            objectPattern([
                objectProperty(id, id, false, true),
            ]),
        ];
    }
    
    path.scope.block.async = true;
    return 'await progress(__args)';
}
