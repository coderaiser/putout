import {types} from 'putout';

const {isRegExpLiteral} = types;

export const report = () => `Use '.endsWith()' instead of '.test()'`;

export const match = () => ({
    '__a.test(__b)': ({__a}) => {
        if (!isRegExpLiteral(__a))
            return false;
        
        const raw = __a.raw.slice(1, -1);
        
        if (!raw.endsWith('$'))
            return false;
        
        if (raw.includes('\\d'))
            return false;
        
        return !/[\^+({*\].]/.test(raw);
    },
});

export const replace = () => ({
    '__a.test(__b)': ({__a}) => {
        const str = __a
            .raw
            .slice(1, -1)
            .replace('$', '');
        
        return `__b.endsWith('${str}')`;
    },
});
