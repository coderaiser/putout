import {
    types,
    operator,
} from 'putout';

const {replaceWith} = operator;
const {RegExpLiteral} = types;

export const report = () => `Replace regexp should be used instead of string`;

export const replace = () => ({
    '__a.replace("__b", __c)': ({__b}, path) => {
        const value = __b.raw.slice(1, -1);
        const raw = `/${escape(value)}/g`;
        
        const regexp = {
            ...RegExpLiteral(escape(value), 'g'),
            raw,
            extra: {
                raw,
            },
        };
        
        replaceWith(path.get('arguments.0'), regexp);
        return path.node;
    },
});

function escape(line) {
    const symbols = '[]^$.|?*+()'.split('');
    
    for (const symbol of symbols) {
        line = line.replace(symbol, `\\${symbol}`);
    }
    
    return line;
}
