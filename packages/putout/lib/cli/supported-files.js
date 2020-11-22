'use strict';

const picomatch = require('picomatch');

let patterns = [];

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : a.split(',').filter(Boolean);
const rmDuplicates = (a) => Array.from(new Set(a));

module.exports.add = (a = '') => {
    const array = maybeArray(a);
    patterns = rmDuplicates(patterns.concat(array));
};

module.exports.isSupported = (name) => {
    for (const pattern of patterns) {
        const isMatch = picomatch(patterns);
        
        if (isMatch(name))
            return true;
    }
    
    return false;
};

module.exports.getSupportedGlob = (file) => `${file}/**/{${patterns.join(',')}}`;

module.exports.getPatterns = () => patterns;
