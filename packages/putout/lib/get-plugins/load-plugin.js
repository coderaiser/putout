'use strict';

const Module = require('module');
const tryCatch = require('try-catch');

const getModulePath = require('./get-module-path');

module.exports = function requirePlugin({name, load = require, namespace, fn}) {
    if (fn)
        return [
            name,
            fn,
        ];
    
    const [, npmPlugin] = tryCatch(load, getModulePath(`@${namespace}/plugin-${name}`));
    
    if (npmPlugin)
        return [
            name,
            npmPlugin,
        ];
    
    const [, userPlugin] = tryCatch(load, getModulePath(`${namespace}-plugin-${name}`));
    
    if (userPlugin)
        return [
            name,
            userPlugin,
        ];
    
    if (Module.plugins && Module.plugins[name])
        return [
            name,
            Module.plugins[name],
        ];
    
    throw Error(`Plugin "${namespace}-plugin-${name} could not be found!`);
};

