'use strict';

const {operator} = require('putout');
const {compareAny} = operator;

module.exports.report = () => `Shorten name`;

const notDeclared = (a) => (vars, path) => {
    const binding = path.scope.getAllBindings()[a];
    
    if (!binding)
        return true;
    
    return compareAny(binding.path.parentPath.node, [
        `const {${a}} = Object`,
        `var {${a}} = Object`,
        `let {${a}} = Object`,
    ]);
};

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
