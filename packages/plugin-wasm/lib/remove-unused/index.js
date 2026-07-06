import {types, operator} from 'putout';

const {
    getBinding,
    compare,
    getTemplateValues,
} = operator;

const {isTSModuleDeclaration} = types;

const FN = 'function __a(__args) {__body}';

export const report = (path) => {
    const {__a} = getTemplateValues(path, FN);
    
    return `Avoid unused '${__a.name}'`;
};

export const match = () => ({
    [FN]: ({__a, __wasm}, path) => {
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
    [FN]: '',
});
