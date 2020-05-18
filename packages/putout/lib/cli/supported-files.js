'use strict';

const once = require('once');

const extensions = require('../../extensions.json');

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : a.split(',').filter(Boolean);
const cutDot = (a) => a.replace(/^\./, '');

module.exports.add = once((a = '') => {
    const exts = maybeArray(a).map(cutDot);
    extensions.push(...exts);
});
module.exports.isJS = (a) => RegExp(`.(${extensions.join('|')})$`).test(a);
module.exports.getJSGlob = (file) => `${file}/**/*.{${extensions.join(',')}}`;

