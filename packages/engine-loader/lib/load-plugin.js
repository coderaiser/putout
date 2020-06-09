'use strict';

const tryCatch = require('try-catch');

const wrapPlugin = require('./wrap-plugin');
const getModulePath = require('./get-module-path');

module.exports = requirePlugin;

function requirePlugin({name, namespace}) {
    if (namespace !== 'putout')
        return wrapPlugin(name, namespace);
    
    const [, npmPlugin] = tryCatch(require, getModulePath(`@${namespace}/plugin-${name}`));
    
    if (npmPlugin)
        return npmPlugin;
    
    const [, userPlugin] = tryCatch(require, getModulePath(`${namespace}-plugin-${name}`));
    
    if (userPlugin)
        return userPlugin;
    
    throw Error(`Plugin "${namespace}-plugin-${name} could not be found!`);
}

