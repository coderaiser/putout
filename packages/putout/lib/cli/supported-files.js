'use strict';

const extensions = [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
];

module.exports.isJS = (a) => RegExp(`.(${extensions.join('|')})$`).test(a);
module.exports.extensions = extensions;

