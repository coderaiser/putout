'use strict';

module.exports.report = () => `Shorten name`;

const notDeclared = (a) => (vars, path) => !path.scope.getAllBindings()[a];

module.exports.match = () => ({
    'Object.keys(__a)': notDeclared('keys'),
    'Object.assign(__a)': notDeclared('assign'),
});

module.exports.replace = () => ({
    'Object.keys(__a)': 'keys(__a)',
    'Object.assign(__a)': 'assign(__a)',
    'Object.defineProperty(__a)': 'defineProperty(__a)',
    'Object.freeze(__a)': 'freeze(__a)',
});
