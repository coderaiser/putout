'use strict';

const {types} = require('putout');
const isNull = (a) => !a && typeof a === 'object';

const {
    isObjectPattern,
    isArrayPattern,
} = types;

module.exports.report = () => 'Avoid empty patterns';

module.exports.match = () => ({
    'for (const __array of __a) __body': checkArray,
    '(__array) => __a': check,
    'const __array = __': check,
    'let __array = __': check,
    '__array = __': check,
    'function __a(__args) {}': checkArgs,
    '(function __b(__args) {})': checkArgs,
    '(async function __b(__args) {})': checkArgs,
    '(__args) => __a': checkArgs,
    'async (__args) => __a': checkArgs,
});

module.exports.replace = () => ({
    'for (const __array of __a) __body': replaceArray,
    'const __array = __': '',
    'let __array = __': '',
    'var [] = __': '',
    'const {} = __': '',
    'let {} = __': '',
    'var {} = __': '',
    '__array = __': '',
    '({} = __)': '',
    '(__array) => __a': '() => __a',
    'function __a(__args) {}': replaceArgs,
    '(function __b(__args) {})': replaceArgs,
    '(async function __b(__args) {})': replaceArgs,
    '(__args) => __a': replaceArgs,
    'async (__args) => __a': replaceArgs,
});

const check = ({__array}, path) => {
    if (path.parentPath.isForOfStatement())
        return false;
    
    const {elements} = __array;
    
    return elements.every(isFixable);
};

function checkArgs({__args}) {
    const n = __args.length;
    const last = __args[n - 1];
    
    if (!last)
        return false;
    
    return isFixable(last);
}

function replaceArgs({__args}, path) {
    __args.pop();
    return path;
}

const isFixable = (a) => {
    if (!a)
        return true;
    
    if (isObjectPattern(a) && !a.properties.length)
        return true;
    
    return isArrayPattern(a) && !a.elements.length;
};

function replaceArray({__array}, path) {
    __array.elements.length = 0;
    __array.elements.pop();
    
    return path;
}

const checkArray = ({__array}) => {
    const {elements} = __array;
    return elements.filter(isNull).length === elements.length;
};
