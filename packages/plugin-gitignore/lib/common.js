'use strict';

const {types} = require('putout');
const {StringLiteral} = types;
const getValue = ({value}) => value;

module.exports.match = (pattern) => () => ({
    '__putout_processor_ignore(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
        return !list.includes(pattern);
    },
});

module.exports.push = (pattern) => () => ({
    '__putout_processor_ignore(__a)': ({__a}, path) => {
        __a.elements.push(StringLiteral(pattern));
        return path;
    },
});

module.exports.unshift = (pattern) => () => ({
    '__putout_processor_ignore(__a)': ({__a}, path) => {
        __a.elements.unshift(StringLiteral(pattern));
        return path;
    },
});

