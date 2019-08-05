'use strict';

const isEnabled = require('./is-enabled');
const loadPlugin = require('./load-plugin');
const parsePluginNames = require('./parse-plugin-names');

module.exports = (options = {}) => {
    const {
        pluginNames = [],
        pluginCache = true,
        rules = [],
    } = options;
    
    const result = [];
    const items = parsePluginNames(pluginNames);
    const plugins = loadPlugins({pluginCache, items});
    
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

function loadPlugins({items, pluginCache}) {
    const plugins = [];
    const namespace = 'putout';
    
    for (const [name, fn] of items) {
        const [rule, plugin] = loadPlugin({
            name,
            fn,
            namespace,
            pluginCache,
        });
        
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

