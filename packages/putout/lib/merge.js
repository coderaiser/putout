'use strict';

const deepmerge = require('deepmerge');

const arrayUnion = (...a) => [
    ...new Set(a.flat()),
];

const arrayMerge = (a, b) => arrayUnion(b, a);

module.exports = (...args) => {
    return deepmerge.all(args, {
        arrayMerge,
    });
};
