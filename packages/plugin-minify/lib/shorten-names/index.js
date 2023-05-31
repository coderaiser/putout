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
    'Object.keys(__args)': notDeclared('keys'),
    'Object.assign(__args)': notDeclared('assign'),
    'Object.defineProperty(__args)': notDeclared('defineProperty'),
    'Object.freeze(__args)': notDeclared('freeze'),
});

module.exports.replace = () => ({
    'Object.keys(__args)': 'keys(__args)',
    'Object.assign(__args)': 'assign(__args)',
    'Object.defineProperty(__args)': 'defineProperty(__args)',
    'Object.freeze(__args)': 'freeze(__args)',
});
