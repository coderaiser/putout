'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;
const {RegExpLiteral} = types;

module.exports.report = () => `Replace regexp should be used instead of string`;

module.exports.replace = () => ({
    '__a.replace("__b", __c)': ({__b}, path) => {
        const value = __b.raw.slice(1, -1);
        const regexp = {
            ...RegExpLiteral(escape(value), 'g'),
            extra: {
                raw: `/${escape(value)}/g`,
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
