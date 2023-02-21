'use strict';

const {types, template} = require('putout');
const {
    ObjectPattern,
    ObjectProperty,
} = types;

const buildDeclaration = template(`
    const %%__b%% = %%__a%%
`);

module.exports.report = () => 'Avoid nested destructuring';

module.exports.match = () => ({
    'const {__a: {__b}} = __c': matchConst,
    'const {__a: {__b: __c}} = __d': matchConst,
});

module.exports.replace = () => ({
    'const {__a: {__b}} = __c': 'const {__a} = __c, {__b} = __a',
    'const {__a: {__b: __c}} = __d': 'const {__a} = __c, {__b: __c} = __a',
    'function f({ __a: { __b } }) {}': replaceArg,
    'function f({ __a: { __b: __c } }) {}': replaceArg,
});

function matchConst({__a}, path) {
    const bindings = path.scope.getAllBindings();
    return !bindings[__a.name];
}

function replaceArg({__a, __b, __c}, path) {
    const {properties} = path.node.params[0];
    const [first] = properties;
    
    first.value = first.key;
    
    const declaration = buildDeclaration({
        __a,
        __b: ObjectPattern([
            ObjectProperty(__b, __c || __b),
        ]),
    });
    
    path.node.body.body.unshift(declaration);
    
    return path;
}
