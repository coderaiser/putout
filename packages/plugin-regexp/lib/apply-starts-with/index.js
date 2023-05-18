'use strict';

const {types} = require('putout');
const {isRegExpLiteral} = types;

module.exports.report = () => `Use '.startsWith()' instead of '.test()'`;

module.exports.match = () => ({
    '__a.test(__b)': ({__a}) => {
        if (!isRegExpLiteral(__a))
            return false;
        
        const raw = __a.raw.slice(1, -1);
        
        if (!raw.startsWith('^'))
            return false;
        
        return !/[$+({*\].]/.test(raw);
    },
});

module.exports.replace = () => ({
    '__a.test(__b)': ({__a}) => {
        const str = __a
            .raw
            .slice(1, -1)
            .replace('^', '');
        
        return `__b.startsWith('${str}')`;
    },
});
