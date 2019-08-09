'use strict';

const Module = require('module');
const tryCatch = require('try-catch');

const wrapPlugin = require('./wrap-plugin');
const getModulePath = require('./get-module-path');
const cache = Object.create(null);

module.exports = ({name, namespace, pluginCache = true}) => {
    if (!pluginCache)
        return requirePlugin({
            name,
            namespace,
        });
    
    if (cache[name])
        return cache[name];
    
    cache[name] = requirePlugin({
        name,
        namespace,
    });
    
    return cache[name];
};

function requirePlugin({name, namespace}) {
    if (namespace !== 'putout')
        return wrapPlugin(name, namespace);
    
    const [, npmPlugin] = tryCatch(require, getModulePath(`@${namespace}/plugin-${name}`));
    
    if (npmPlugin)
        return npmPlugin;
    
    const [, userPlugin] = tryCatch(require, getModulePath(`${namespace}-plugin-${name}`));
    
    if (userPlugin)
        return userPlugin;
    
    if (Module.plugins && Module.plugins[name])
        return Module.plugins[name];
    
    throw Error(`Plugin "${namespace}-plugin-${name} could not be found!`);
}

