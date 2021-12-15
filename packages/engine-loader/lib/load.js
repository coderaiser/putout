'use strict';

const {createRequire} = require('module');
const tryCatch = require('try-catch');

const wrapPlugin = require('./wrap-plugin');

// yarn PnP API
// https://yarnpkg.com/advanced/rulebook#modules-shouldnt-hardcode-node_modules-paths-to-access-other-modules
const customRequire = createRequire(__filename);
const bigFirst = (a) => `${a[0].toUpperCase()}${a.slice(1)}`;

const getModulePath = (name) => {
    const [, path] = tryCatch(customRequire.resolve, name);
    return path;
};

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
    
    return customRequire(pluginPath);
};

module.exports.loadPlugin = load('plugin');
module.exports.loadProcessor = load('processor');

