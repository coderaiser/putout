'use strict';

const Module = require('module');

const tryCatch = require('try-catch');

const {cwd} = process;
const {entries} = Object;

const isDisabled = (a) => !a && typeof a === 'boolean';
const isObj = (a) => typeof a === 'object';
const isStr = (a) => typeof a === 'string';

const parsePluginNames = (plugins) => {
    const result = [];
    
    for (const name of plugins) {
        if (isStr(name)) {
            result.push(name);
            continue;
        }
        
        const keys = Object.keys(name);
        result.push(...keys);
    }
    
    return result;
};

module.exports = (options = {}) => {
    const {
        plugins = [],
        rules = [],
    } = options;
    
    const names = parsePluginNames(plugins);
    const result = [];
    
    for (const name of names)
        if (!isDisabled(rules[name]))
            result.push(requirePlugin(name));
    
    return result;
};

function requirePlugin(name) {
    const [, npmPlugin] = tryCatch(require, getModulePath(`@putout/plugin-${name}`));
    if (npmPlugin)
        return [
            name,
            npmPlugin,
        ];
     
    const [, userPlugin] = tryCatch(require, getModulePath(`putout-plugin-${name}`));
    if (userPlugin)
        return [
            name,
            userPlugin,
        ];
    
    throw Error(`Plugin "putout-plugin-${name} could not be found!`);
}

// Module._findPath is an internal method to Node.js, then one they use to
// lookup file paths when require() is called. So, we are hooking into the
// exact same logic that Node.js uses.
//
// https://github.com/eslint/eslint/blob/v5.12.0/lib/util/module-resolver.js#L69
const getModulePath = (name) => {
    return Module._findPath(name, [
        `${cwd()}/node_modules`,
        ...module.paths
    ]);
};

