'use strict';

const {types} = require('putout');
const {
    isArrayExpression,
    isStringLiteral,
} = types;

module.exports.report = () => '"putout" should be in the end of the "extends" list';

module.exports.match = () => ({
    '__putout_processor_json(__a)': ({__a}) => {
        const x = __a.properties.find(isExtends);
        
        if (!x)
            return false;
        
        if (!isArrayExpression(x.value))
            return false;
        
        const {elements} = x.value;
        const [first] = elements;
        const {value} = first;
        
        const includesPutout = value.includes('putout');
        
        if (elements.length === 1 && includesPutout)
            return false;
        
        return includesPutout;
    },
});

module.exports.replace = () => ({
    '__putout_processor_json(__a)': ({__a}, path) => {
        const x = __a.properties.find(isExtends);
        const {elements} = x.value;
        
        const first = elements.shift();
        elements.push(first);
        
        return path;
    },
});

function isExtends({key}) {
    return isStringLiteral(key, {
        value: 'extends',
    });
}

