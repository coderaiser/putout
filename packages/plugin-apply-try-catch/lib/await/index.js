'use strict';

module.exports.report = () => `Use await with 'tryToCatch'`;

module.exports.match = () => ({
    'tryToCatch(__args)': (vars, path) => !path.parentPath.isAwaitExpression(),
});

module.exports.replace = () => ({
    'await tryCatch(__args)': 'await tryToCatch(__args)',
    'tryToCatch(__args)': 'await tryToCatch(__args)',
});

