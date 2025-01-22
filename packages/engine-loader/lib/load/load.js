'use strict';

const process = require('node:process');
const {createRequire} = require('node:module');
const {join} = require('node:path');
const tryCatch = require('try-catch');
const once = require('once');
const {assign} = Object;

const bigFirst = (a) => `${a[0].toUpperCase()}${a.slice(1)}`;

const load = (type) => ({name, namespace}) => {
    const [pluginPath, customRequire] = getPath(namespace, type, name);
    
    if (!pluginPath)
        throw Error(`${bigFirst(type)} "${namespace}-${type}-${name}" could not be found!`);
    
    const [error, result] = tryCatch(customRequire, pluginPath);
    
    /* c8 ignore start */
    if (error?.code === 'ERR_REQUIRE_ESM')
        assign(error, {
            message: `☝️ Looks like '${name}' is ESM, use 'await putoutAsync()' instead`,
            name,
        });
    
    /* c8 ignore end */
    if (error)
        throw error;
    
    return result;
};

module.exports.loadPlugin = load('plugin');
module.exports.loadProcessor = load('processor');

function getPath(namespace, type, name) {
    if (name.startsWith('import:'))
        return getModulePath(name.replace('import:', ''));
    
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
function getModulePath(name, {again = false} = {}) {
    let path;
    
    const customRequire = createCustomRequire();
    const putoutRequire = createPutoutRequire();
    
    [, path] = tryCatch(putoutRequire.resolve, name);
    
    if (path)
        return [path, putoutRequire];
    
    [, path] = tryCatch(customRequire.resolve, name);
    
    if (!path && !again)
        return getModulePath(buildPluginsDir(name), {
            again: true,
        });
    
    return [path, customRequire];
}

const getPutoutLoadDir = once(() => process.env.PUTOUT_LOAD_DIR);

function buildPluginsDir(name) {
    const dir = getPutoutLoadDir();
    
    if (!dir)
        return name;
    
    return join(dir, name);
}
