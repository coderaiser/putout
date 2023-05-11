'use strict';

module.exports.report = () => `Avoid 'return undefined'`;

module.exports.match = () => ({
    return: check,
});

module.exports.replace = () => ({
    'return': '',
    'return undefined': 'return',
    'return void 0': 'return',
});

function check(vars, {parentPath}) {
    if (!parentPath.isBlockStatement())
        return false;
    
    return parentPath.parentPath.isFunction();
}
