import {types, operator} from 'putout';

const {getBinding, compare} = operator;

const {isTSModuleDeclaration} = types;

export const report = () => `Use 'local.set' instead of 'set_local'`;

export const match = () => ({
    'function __a(__args) {__body}': ({__a, __wasm}, path) => {
        const namespace = path.find(isTSModuleDeclaration);
        
        if (!namespace)
            return false;
        
        if (compare(namespace, __wasm))
            return false;
        
        const binding = getBinding(path, __a.name);
        
        return !binding.referenced;
    },
});

export const replace = () => ({
    'function __a(__args) {__body}': '',
});
