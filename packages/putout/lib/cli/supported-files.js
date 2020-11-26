'use strict';

const picomatch = require('picomatch');

let patterns = [];

const rmDuplicates = (a) => Array.from(new Set(a));

module.exports.add = (array) => {
    patterns = rmDuplicates(patterns.concat(array));
};

module.exports.isSupported = (name) => {
    for (const pattern of patterns) {
        const isMatch = picomatch(patterns, {
            dot: true,
            matchBase: true,
        });
        
        if (isMatch(name))
            return true;
    }
    
    return false;
};

module.exports.getSupportedGlob = (file) => `${file}/**/{${patterns.join(',')}}`;

module.exports.getPatterns = () => patterns;
