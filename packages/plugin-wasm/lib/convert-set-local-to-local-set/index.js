import {operator, types} from 'putout';

const {compare, __wasm} = operator;
const {isTSModuleDeclaration} = types;

export const report = () => `Use 'local.set' instead of 'set_local'`;

export const match = () => ({
    'set_local(__a)': (vars, path) => {
        const namespace = path.find(isTSModuleDeclaration);
        
        if (!namespace)
            return false;
        
        return compare(namespace, __wasm);
    },
});

export const replace = () => ({
    'set_local(__a)': 'local.set(__a)',
});
