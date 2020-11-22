'use strict';

const {types} = require('putout');

const {StringLiteral} = types;

const getValue = ({value}) => value;

module.exports.report = () => '.putoutcache should be added to .gitignore';

module.exports.match = () => ({
    '__putout_processor_ignore(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
        return !list.includes('.putoutcache');
    },
});

module.exports.replace = () => ({
    '__putout_processor_ignore(__a)': ({__a}, path) => {
        __a.elements.push(StringLiteral('.putoutcache'));
        return path;
    },
});
