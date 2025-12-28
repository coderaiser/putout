'use strict';

const process = require('node:process');
const {createRequire: _createRequire} = require('node:module');
const {join} = require('node:path');
const tryCatch = require('try-catch');
const once = require('once');

const bigFirst = (a) => `${a[0].toUpperCase()}${a.slice(1)}`;

const load = (type) => (overrides) => {
    const {
        name,
        namespace,
        getModulePath = _getModulePath,
        createRequire = _createRequire,
    } = overrides;
    
    const [pluginPath, customRequire] = getPath(namespace, type, name, {
        getModulePath,
        createRequire,
    });
    
    if (!pluginPath)
        throw Error(`${bigFirst(type)} "${namespace}-${type}-${name}" could not be found!`);
    
    const [error, result] = tryCatch(customRequire, pluginPath);
    
    if (error)
        throw error;
    
    return result;
};

module.exports.loadPlugin = load('plugin');
module.exports.loadProcessor = load('processor');

function getPath(namespace, type, name, overrides) {
    const {getModulePath, createRequire} = overrides;
    
    if (name.startsWith('import:'))
        return getModulePath(name.replace('import:', ''), {
            createRequire,
        });
    
    let [path, customRequire] = getModulePath(`@${namespace}/${type}-${name}`, {
        createRequire,
    });
    
    if (!path)
        [path, customRequire] = getModulePath(`${namespace}-${type}-${name}`, {
            createRequire,
        });
    
    if (!path)
        [path, customRequire] = getModulePath(name, {
            createRequire,
        });
    
    return [path, customRequire];
}

const {
    PUTOUT_YARN_PNP = 'putout',
} = process.env;

const createCustomRequire = (createRequire) => createRequire(require.resolve(PUTOUT_YARN_PNP));
const createPutoutRequire = (createRequire) => createRequire(require.resolve('putout'));

// That's all for Yarn P'n'P
//
// We need to create a couple version of require for plugins, formatters and processors:
// - declared in 🐊Putout package.json;
// - declared in module that want to extend 🐊Putout;
//
// https://yarnpkg.com/advanced/rulebook#modules-shouldnt-hardcode-node_modules-paths-to-access-other-modules
function _getModulePath(name, overrides = {}) {
    const {again = false, createRequire} = overrides;
    let path;
    
    const customRequire = createCustomRequire(createRequire);
    const putoutRequire = createPutoutRequire(createRequire);
    
    [, path] = tryCatch(putoutRequire.resolve, name);
    
    if (path)
        return [path, putoutRequire];
    
    [, path] = tryCatch(customRequire.resolve, name);
    
    if (!path && !again)
        return _getModulePath(buildPluginsDir(name), {
            again: true,
            createRequire,
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
