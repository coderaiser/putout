import {operator, types} from 'putout';

const {isTSModuleDeclaration} = types;
const {compare, __wasm} = operator;

export const report = () => `Use 'local.get' instead of 'get_local'`;

export const match = () => ({
    'get_local(__a)': (vars, path) => {
        const namespace = path.find(isTSModuleDeclaration);
        return compare(namespace, __wasm);
    },
});

export const replace = () => ({
    'get_local(__a)': 'local.get(__a)',
});
