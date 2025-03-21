import {types} from 'putout';

const {isStringLiteral} = types;

const NESTED = {
    createDirectory: 'createNestedDirectory',
    createNestedDirectory: 'createDirectory',
};

export const report = (path) => {
    const {name} = path.node.callee;
    return `Use '${NESTED[name]}()' instead of '${name}()'`;
};

export const match = () => ({
    'createDirectory(__a, __b)': ({__b}) => {
        if (!isStringLiteral(__b))
            return false;
        
        return __b.value.includes('/');
    },
    'createNestedDirectory(__a, __b)': ({__b}) => {
        if (!isStringLiteral(__b))
            return false;
        
        return !__b.value.includes('/');
    },
});

export const replace = () => ({
    'createDirectory(__a, __b)': 'createNestedDirectory(__a, __b)',
    'createNestedDirectory(__a, __b)': 'createDirectory(__a, __b)',
});
