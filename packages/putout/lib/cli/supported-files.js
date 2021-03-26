'use strict';

const {normalize} = require('path');
const picomatch = require('picomatch');

let patterns = [];

const rmDuplicates = (a) => Array.from(new Set(a));

module.exports.add = (array) => {
    patterns = rmDuplicates(patterns.concat(array));
};

module.exports.isSupported = (name) => {
    const isMatch = picomatch(patterns, {
        dot: true,
        matchBase: true,
    });
    
    return isMatch(name);
};

module.exports.getSupportedGlob = (file) => normalize(`${file}/**/{${patterns.join(',')}}`);

module.exports.getPatterns = () => patterns;
