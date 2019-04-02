'use strict';

const Module = require('module');
const tryCatch = require('try-catch');

const buildPaths = require('./build-paths');
const isEnabled = require('./is-enabled');

const {cwd} = process;

const isStr = (a) => typeof a === 'string';
const paths = [
    ...buildPaths(cwd()),
    ...module.paths,
];

const parsePluginNames = (plugins) => {
    const result = [];
    
    for (const name of plugins) {
        if (isStr(name)) {
            result.push([name]);
            continue;
        }
        
        const keys = Object.entries(name);
        result.push(...keys);
    }
    
    return result;
};

module.exports = (options = {}) => {
    const {
        plugins = [],
        rules = [],
    } = options;
    
    const result = [];
    const names = parsePluginNames(plugins);
    const pluginItems = loadPlugins(names);
    
    for (const [name, fn] of pluginItems) {
        if (!isEnabled(name, rules))
            continue;
        
        result.push([
            name,
            fn,
        ]);
    }
    
    return result;
};

module.exports._buildPaths = buildPaths;

function loadPlugins(items) {
    const plugins = [];
    
    for (const [name, fn] of items) {
        const [rule, plugin] = requirePlugin(name, fn);
        const {rules} = plugin;
        
        if (rules) {
            plugins.push(...extendRules(rule, rules));
            continue;
        }
        
        plugins.push([
            rule,
            plugin,
        ]);
    }
    
    return plugins;
}

function extendRules(rule, plugin) {
    const result = [];
    const entries = Object.entries(plugin);
    
    for (const [name, fn] of entries) {
        result.push([
            `${rule}/${name}`,
            fn,
        ]);
    }
    
    return result;
}

function requirePlugin(name, fn) {
    if (fn)
        return [
            name,
            fn,
        ];
    
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
    return Module._findPath(name, paths);
};

