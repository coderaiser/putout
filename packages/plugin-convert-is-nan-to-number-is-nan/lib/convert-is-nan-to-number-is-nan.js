'use strict';

module.exports.report = () => `Number.isNaN should be used instead of isNaN`;

module.exports.match = () => ({
    'isNaN(__a)': (vars, path) => !path.scope.bindings.isNaN,
});

module.exports.replace = () => ({
    'isNaN(__a)': 'Number.isNaN(__a)',
});

