'use strict';

const {normalize} = require('path');
const picomatch = require('picomatch');

let patterns = [];
let isMatch;

const rmDuplicates = (a) => Array.from(new Set(a));

module.exports.add = (array) => {
    patterns = rmDuplicates(patterns.concat(array));
    isMatch = picomatch(patterns, {
        dot: true,
        matchBase: true,
    });
};

module.exports.isSupported = (name) => isMatch(name);

module.exports.getSupportedGlob = (file) => normalize(`${file}/**/{${patterns.join(',')}}`);

module.exports.getPatterns = () => patterns;
