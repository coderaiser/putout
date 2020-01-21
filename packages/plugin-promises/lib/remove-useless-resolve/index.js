'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;
const {isFunction} = types;

module.exports.report = () => `Resolve is useless in async functions, use return value instead`;

module.exports.fix = (path) => {
    const argPath = path.get('argument');
    const [arg] = argPath.node.arguments;
    replaceWith(argPath, arg);
};

module.exports.include = () => [
    'return Promise.resolve(__)',
];

module.exports.filter = (path) => {
    const fnPath = path.find(isFunction);
    
    if (!fnPath)
        return false;
    
    const {async} = fnPath.node;
    
    return async;
};
