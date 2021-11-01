'use strict';

const wrapPlugin = require('./wrap-plugin');
const getModulePath = require('./get-module-path');

const bigFirst = (a) => `${a[0].toUpperCase()}${a.slice(1)}`;

function getPath(namespace, type, name) {
    let path = getModulePath(`@${namespace}/${type}-${name}`);
    
    if (!path)
        path = getModulePath(`${namespace}-${type}-${name}`);
    
    if (!path)
        path = getModulePath(name);
    
    return path;
}

const load = (type) => ({name, namespace}) => {
    if (namespace !== 'putout')
        return wrapPlugin(name, namespace);
    
    const pluginPath = getPath(namespace, type, name);
    
    if (!pluginPath)
        throw Error(`${bigFirst(type)} "${namespace}-${type}-${name}" could not be found!`);
    
    return require(pluginPath);
};

module.exports.loadPlugin = load('plugin');
module.exports.loadProcessor = load('processor');

