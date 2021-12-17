'use strict';

const {createRequire} = require('module');

const tryCatch = require('try-catch');
const once = require('once');

const wrapPlugin = require('./wrap-plugin');

const bigFirst = (a) => `${a[0].toUpperCase()}${a.slice(1)}`;

const load = (type) => ({name, namespace}) => {
    if (namespace !== 'putout')
        return wrapPlugin(name, namespace);
    
    const [pluginPath, customRequire] = getPath(namespace, type, name);
    
    if (!pluginPath)
        throw Error(`${bigFirst(type)} "${namespace}-${type}-${name}" could not be found!`);
    
    return customRequire(pluginPath);
};

module.exports.loadPlugin = load('plugin');
module.exports.loadProcessor = load('processor');

function getPath(namespace, type, name) {
    let [path, customRequire] = getModulePath(`@${namespace}/${type}-${name}`);
    
    if (!path)
        [path, customRequire] = getModulePath(`${namespace}-${type}-${name}`);
    
    if (!path)
        [path, customRequire] = getModulePath(name);
    
    return [path, customRequire];
}

const {PUTOUT_YARN_PNP = 'putout'} = process.env;

const createCustomRequire = once(() => createRequire(require.resolve(PUTOUT_YARN_PNP)));
const createPutoutRequire = once(() => createRequire(require.resolve('putout')));

// That's all for Yarn P'n'P
//
// We need to create a couple version of require for plugins, formatters and processors:
// - declared in 🐊Putout package.json;
// - declared in module that want to extend 🐊Putout;
//
// https://yarnpkg.com/advanced/rulebook#modules-shouldnt-hardcode-node_modules-paths-to-access-other-modules
function getModulePath(name) {
    let path;
    
    const customRequire = createCustomRequire();
    const putoutRequire = createPutoutRequire();
    
    [, path] = tryCatch(putoutRequire.resolve, name);
    
    if (path)
        return [path, putoutRequire];
    
    [, path] = tryCatch(customRequire.resolve, name);
    
    return [path, customRequire];
}

