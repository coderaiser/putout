'use strict';

const isEnabled = require('./is-enabled');
const loadPlugin = require('./load-plugin');
const parsePluginNames = require('./parse-plugin-names');

module.exports = (options = {}) => {
    const {
        pluginNames = [],
        cache = true,
        rules = [],
    } = options;
    
    const items = parsePluginNames(pluginNames)
        .filter(isEnabled(rules));
    
    return loadPlugins({
        items,
        cache,
    });
};

function parseRule(rule) {
    const name = rule
        .replace('babel/', '')
        .replace('jscodeshift/', '');
    
    if (/^babel/.test(rule))
        return [
            name,
            'babel',
        ];
    
    if (/^jscodeshift/.test(rule))
        return [
            name,
            'jscodeshift',
        ];
    
    return [
        name,
        'putout',
    ];
}

function loadPlugins({items, cache}) {
    const plugins = [];
    
    for (const [rule, fn] of items) {
        const [name, namespace] = parseRule(rule);
        
        const plugin = loadPlugin({
            name,
            fn,
            namespace,
            pluginCache: cache,
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

