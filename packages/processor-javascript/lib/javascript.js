'use strict';

module.exports.files = [
    '*.js',
    '*.mjs',
    '*.cjs',
    '*.jsx',
    '*.ts',
    '*.tsx',
];

module.exports.preProcess = (source) => {
    return [{
        source,
        startLine: 0,
    }];
};

module.exports.postProcess = (source, list) => {
    return list[0];
};

