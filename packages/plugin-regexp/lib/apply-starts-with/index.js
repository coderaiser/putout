import {types} from 'putout';

const {isRegExpLiteral} = types;

export const report = () => `Use '.startsWith()' instead of '.test()'`;

export const match = () => ({
    '__a.test(__b)': ({__a}) => {
        if (!isRegExpLiteral(__a))
            return false;
        
        let raw = __a.raw.slice(1, -1);
        
        if (!raw.startsWith('^'))
            return false;
        
        raw = raw.replaceAll('\\.', '');
        
        return !/[$+({*\].]/.test(raw);
    },
});

export const replace = () => ({
    '__a.test(__b)': ({__a}) => {
        const str = __a.raw
            .slice(1, -1)
            .replace('^', '');
        
        return `__b.startsWith('${str}')`;
    },
});
