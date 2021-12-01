'use strict';

const {types} = require('putout');

const {isObjectPattern} = require('putout').types;

const {isArrayPattern} = types;

module.exports.report = () => 'Avoid empty patterns';

const notOk = (a) => {
    if (!a)
        return true;
    
    if (isObjectPattern(a) && !a.properties.length)
        return true;
    
    if (isArrayPattern(a) && !a.elements.length)
        return true;
    
    return false;
};
const check = ({__array}) => {
    const {elements} = __array;
    return elements.every(notOk);
};

module.exports.match = () => ({
    '(__array) => __a': check,
    'const __array = __': check,
    'let __array = __': check,
    '__array = __': check,
});

module.exports.replace = () => ({
    'const __array = __': '',
    'let __array = __': '',
    'const {} = __': '',
    'let {} = __': '',
    '__array = __': '',
    '({} = __)': '',
    '(__array) => __a': '() => __a',
    '({}) => __a': '() => __a',
});

