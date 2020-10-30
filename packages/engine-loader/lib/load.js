'use strict';

const tryCatch = require('try-catch');

const wrapPlugin = require('./wrap-plugin');
const getModulePath = require('./get-module-path');

const bigFirst = (a) => `${a[0].toUpperCase()}${a.slice(1)}`;

const load = (type) => ({name, namespace}) => {
    if (namespace !== 'putout')
        return wrapPlugin(name, namespace);
    
    const [, npmPlugin] = tryCatch(require, getModulePath(`@${namespace}/${type}-${name}`));
    
    if (npmPlugin)
        return npmPlugin;
    
    const [, userPlugin] = tryCatch(require, getModulePath(`${namespace}-${type}-${name}`));
    
    if (userPlugin)
        return userPlugin;
    
    throw Error(`${bigFirst(type)} "${namespace}-${type}-${name}" could not be found!`);
};

module.exports.loadPlugin = load('plugin');
module.exports.loadProcessor = load('processor');

