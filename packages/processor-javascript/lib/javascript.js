'use strict';

module.exports.files = [
    '*.js',
    '*.mjs',
    '*.cjs',
    '*.jsx',
    '*.ts',
    '*.tsx',
];

module.exports.branch = (source) => [{
    source,
    startLine: 0,
}];

module.exports.merge = (source, list) => list[0];

