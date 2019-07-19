'use strict';

const deepmerge = require('deepmerge');
const arrayUnion = require('array-union');

const arrayMerge = (a, b) => arrayUnion(b, a);

module.exports = (...args) => {
    return deepmerge.all(args, {
        arrayMerge,
    });
};

