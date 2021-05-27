'use strict';

module.exports.files = [
    '*.js',
    '*.mjs',
    '*.cjs',
    '*.jsx',
    '*.ts',
    '*.tsx',
];

module.exports.branch = (source) => {
    return [{
        source,
        startLine: 0,
    }];
};

module.exports.merge = (source, list) => {
    return list[0];
};

