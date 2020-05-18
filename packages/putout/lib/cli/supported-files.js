'use strict';

const extensions = require('../../extensions');

module.exports.isJS = (a) => RegExp(`.(${extensions.join('|')})$`).test(a);
module.exports.getJSGlob = (file) => `${file}/**/*.{${extensions.join(',')}}`;

