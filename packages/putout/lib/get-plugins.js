'use strict';

const {join} = require('path');

const deepmerge = require('deepmerge');
const tryCatch = require('try-catch');

const defaultOptions = require('../putout.json');

const addDir = (a) => join(__dirname, '..', 'lib', a);
const isDisabled = (a) => !a && typeof a === 'boolean';
const arrayMerge = (destinationArray, sourceArray) => sourceArray;
const isObj = (a) => typeof a === 'object';

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
            result.push(requirePlugin(name));
        }
    
    return result;
};

function requirePlugin(name) {
    if (isObj(name))
        return name;
    
    const full = addDir(name);
    const [, localPlugin] = tryCatch(require, full);
    
    if (localPlugin)
        return localPlugin;
    
    const [, npmPlugin] = tryCatch(require, `@putout/plugin-${name}`);
    if (npmPlugin)
        return npmPlugin;
     
    const [, userPlugin] = tryCatch(require, `putout-plugin-${name}`);
    if (userPlugin)
        return userPlugin;
}

