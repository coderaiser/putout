'use strict';

const {operator} = require('putout');
const {findBinding} = operator;

module.exports.report = () => `"return await promise()" should be used instead of "return promise()"`;

module.exports.replace = () => ({
    'return __a(__args)': 'return await __a(__args)',
});

module.exports.filter = (path) => {
    const {
        node,
        scope,
    } = path.get('argument');
    
    if (!scope.block.async)
        return false;
    
    const {name} = node.callee;
    const bindings = findBinding(path, name);
    
    if (!bindings)
        return false;
    
    const {async} = bindings.path.node;
    return async;
};

