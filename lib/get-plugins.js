'use strict';

const {join} = require('path');

const deepmerge = require('deepmerge');

const defaultOptions = require('../putout.json');

const addDir = (a) => join(__dirname, '..', 'lib', a);
const isDisabled = (a) => !a && typeof a === 'boolean';
const arrayMerge = (destinationArray, sourceArray) => sourceArray;

module.exports = (options = {}) => {
    const {
        plugins,
        rules,
    } = deepmerge(defaultOptions, options, {
        arrayMerge,
    });
    
    const result = [];
    for (const name of plugins)
        if (!isDisabled(rules[name])) {
            const full = addDir(name);
            result.push(require(full));
        }
    
    return result;
};

