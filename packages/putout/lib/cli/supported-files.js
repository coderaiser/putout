'use strict';

const {normalize} = require('node:path');
const picomatch = require('picomatch');
const fullstore = require('fullstore');

const isMatchStore = fullstore();

let patterns = [];

const rmDuplicates = (a) => Array.from(new Set(a));

module.exports.add = (array) => {
    patterns = rmDuplicates(patterns.concat(array));
    
    const isMatch = picomatch(patterns, {
        dot: true,
        matchBase: true,
    });
    
    isMatchStore(isMatch);
};

module.exports.isSupported = (name) => {
    const isMatch = isMatchStore();
    return isMatch(name);
};

module.exports.getSupportedGlob = (file) => normalize(`${file}/**/{${patterns.join(',')}}`);

module.exports.getPatterns = () => patterns;
