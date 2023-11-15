'use strict';

const {operator} = require('putout');
const {__ignore} = operator;

const getValue = ({value}) => value;
const notValue = (name) => ({value}) => value !== name;

module.exports.report = () => '.putoutcache should be removed from .gitignore';

module.exports.match = () => ({
    [__ignore]: ({__array}) => {
        const list = __array.elements.map(getValue);
        
        return list.includes('.putoutcache');
    },
});

module.exports.replace = () => ({
    [__ignore]: ({__array}, path) => {
        __array.elements = __array.elements.filter(notValue('.putoutcache'));
        
        return path;
    },
});
