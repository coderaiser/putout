'use strict';

module.exports.files = [
    '*.throw',
];

module.exports.isMatch = () => true,

module.exports.branch = (source) => {
    throw Error('preProcess');
};

module.exports.merge = (source, list) => {
    return list[0];
};

