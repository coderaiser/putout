'use strict';

const {operator} = require('putout');
const {compareAny} = operator;

module.exports.report = () => `Shorten name`;

const notDeclared = (a, b) => (vars, path) => {
    const binding = path.scope.getAllBindings()[b];
    
    if (!binding)
        return true;
    
    return compareAny(binding.path.parentPath.node, [`const {${b}} = ${a}`, `var {${b}} = ${a}`, `let {${b}} = ${a}`]);
};

module.exports.match = () => ({
    'Object.keys(__args)': notDeclared('Object', 'keys'),
    'Object.assign(__args)': notDeclared('Object', 'assign'),
    'Object.defineProperty(__args)': notDeclared('Object', 'defineProperty'),
    'Object.freeze(__args)': notDeclared('Object', 'freeze'),
});

module.exports.replace = () => ({
    'Object.keys(__args)': 'keys(__args)',
    'Object.assign(__args)': 'assign(__args)',
    'Object.defineProperty(__args)': 'defineProperty(__args)',
    'Object.freeze(__args)': 'freeze(__args)',
    
    'Array.isArray(__args)': 'isArray(__args)',
});
