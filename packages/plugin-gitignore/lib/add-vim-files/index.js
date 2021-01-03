'use strict';

const {types} = require('putout');
const {StringLiteral} = types;
const getValue = ({value}) => value;

module.exports.report = () => 'vim files should be added to .gitignore';

module.exports.match = () => ({
    '__putout_processor_ignore(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
        return !list.includes('*.swp');
    },
});

module.exports.replace = () => ({
    '__putout_processor_ignore(__a)': ({__a}, path) => {
        __a.elements.unshift(StringLiteral('*.swp'));
        return path;
    },
});

