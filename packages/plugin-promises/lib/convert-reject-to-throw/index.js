'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;
const {isFunction} = types;

module.exports.report = () => 'Reject is useless in async functions, use throw instead';

module.exports.fix = (path) => {
    const argPath = path.get('argument');
    const [arg] = argPath.node.arguments;
    replaceWith(path, types.throwStatement(arg));
};

module.exports.include = () => [
    'return Promise.reject(__)',
];

module.exports.filter = (path) => {
    const fnPath = path.find(isFunction);
    
    if (!fnPath)
        return false;
    
    const {async} = fnPath.node;
    
    return async;
};

