'use strict';

const isEnabled = require('./is-enabled');
const loadPlugin = require('./load-plugin');
const parsePluginNames = require('./parse-plugin-names');

module.exports = (options = {}) => {
    const {
        pluginNames = [],
        rules = [],
    } = options;
    
    const result = [];
    const names = parsePluginNames(pluginNames);
    const plugins = loadPlugins(names);
    
    for (const [name, fn] of plugins) {
        if (!isEnabled(name, rules))
            continue;
        
        result.push([
            name,
            fn,
        ]);
    }
    
    return result;
};

function loadPlugins(items) {
    const plugins = [];
    const namespace = 'putout';
    
    for (const [name, fn] of items) {
        const [rule, plugin] = loadPlugin({name, fn, namespace});
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

