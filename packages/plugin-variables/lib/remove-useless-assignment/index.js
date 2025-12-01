import {types, operator} from 'putout';

const {getBinding} = operator;
const {isIdentifier} = types;

export const report = () => `Avoid useless assignment`;

export const match = () => ({
    '(__a = __b).__c': ({__a}, path) => {
        if (!isIdentifier(__a))
            return false;
        
        const binding = getBinding(path, __a.name);
        
        if (!binding)
            return false;
        
        const {references} = binding;
        
        return !references;
    },
});

export const replace = () => ({
    '(__a = __b).__c': '__b.__c',
});
