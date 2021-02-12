'use strict';

module.exports.files = [
    '*.throw',
];

module.exports.preProcess = (source) => {
    throw Error('preProcess');
};

module.exports.postProcess = (source, list) => {
    return list[0];
};

