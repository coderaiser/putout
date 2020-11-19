'use strict';

let extensions = [];

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : a.split(',').filter(Boolean);
const cutDot = (a) => a.replace(/^\./, '');
const rmDuplicates = (a) => Array.from(new Set(a));

module.exports.add = (a = '') => {
    const exts = maybeArray(a).map(cutDot);
    extensions = rmDuplicates(extensions.concat(exts));
};

module.exports.isSupported = (a) => RegExp(`.(${extensions.join('|')})$`).test(a);
module.exports.getSupportedGlob = (file) => `${file}/**/*.{${extensions.join(',')}}`;

module.exports.getExtensions = () => extensions;

