import {types, template} from 'putout';

const {
    objectProperty,
    isObjectPattern,
    objectPattern,
} = types;

const buildDeclaration = template(`
    const %%__b%% = %%__a%%
`);

export const report = () => 'Avoid nested destructuring';

export const match = () => ({
    'const {__a: {__b}} = __c': matchConst,
    'const {__a: {__b: __c}} = __d': matchConst,
});

export const replace = () => ({
    'const {__a: {__b}} = __c': 'const {__a} = __c, {__b} = __a',
    'const {__a: {__b: __c}} = __d': 'const {__a} = __d, {__b: __c} = __a',
    'const {__a: {__b = __c}} = __d': 'const {__a} = __d, {__b = __c} = __a',
    'function f({ __a: { __b } }) {}': replaceArg,
    'function f({ __a: { __b: __c } }) {}': replaceArg,
});

function matchConst({__a, __c}, path) {
    const bindings = path.scope.getAllBindings();
    
    if (bindings[__a.name])
        return false;
    
    return !isObjectPattern(__c);
}

function replaceArg({__a, __b, __c}, path) {
    const {properties} = path.node.params[0];
    const [first] = properties;
    
    first.value = first.key;
    
    const declaration = buildDeclaration({
        __a,
        __b: objectPattern([
            objectProperty(__b, __c || __b),
        ]),
    });
    
    path.node.body.body.unshift(declaration);
    
    return path;
}
