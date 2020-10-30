'use strict';

const extensions = require('putout/extensions');

module.exports.extensions = extensions;

module.exports.preProcess = (source) => {
    return [{
        source,
        startLine: 0,
    }];
};

module.exports.postProcess = (source, list) => {
    return list[0];
};

