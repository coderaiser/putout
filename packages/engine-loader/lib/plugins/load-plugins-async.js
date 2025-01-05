'use strict';

const {basename} = require('node:path');

const {
    parseRules,
    isEnabled,
    getLoadedRules,
} = require('../rules');

const {parsePluginNames} = require('./parse-plugin-names');
const validatePlugin = require('./validate-plugin');
const {filterEnabledPlugins} = require('./filter-enabled-plugins');

const {createAsyncLoader} = require('../load/async-loader');
const {check, checkRule} = require('../check');

const loadPluginAsync = createAsyncLoader('plugin');

module.exports.loadPluginsAsync = async (options) => {
    check(options);
    
    const {pluginNames = [], rules = {}} = options;
    
    const cookedRules = parseRules(rules);
    const loadedRules = getLoadedRules(cookedRules);
    const items = parsePluginNames(pluginNames);
    
    const plugins = await loadPlugins({
        items,
        loadedRules,
    });
    
    return filterEnabledPlugins({
        plugins,
        cookedRules,
    });
};

const splitRule = (rule) => [rule, 'putout'];

async function loadPlugins({items, loadedRules}) {
    const promises = [];
    const enabledRules = [];
    
    for (const [rule, itemPlugin] of items) {
        if (!isEnabled(rule, loadedRules))
            continue;
        
        checkRule(rule);
        
        const [name] = splitRule(rule);
        const plugin = itemPlugin || loadPluginAsync(name);
        
        enabledRules.push(parseRuleName(rule));
        promises.push(plugin);
    }
    
    const resolvedPlugins = await Promise.all(promises);
    const plugins = [];
    
    for (const [i, rule] of enabledRules.entries()) {
        const plugin = resolvedPlugins[i];
        
        validatePlugin({
            plugin,
            rule,
        });
        
        const {rules} = plugin;
        
        if (rules) {
            plugins.push(...extendRules(rule, rules));
            continue;
        }
        
        plugins.push([rule, plugin]);
    }
    
    return plugins;
}

function extendRules(rule, plugin) {
    const result = [];
    const entries = Object.entries(plugin);
    
    for (const [name, plugin] of entries) {
        result.push([`${rule}/${name}`, plugin]);
    }
    
    return result;
}

function parseRuleName(rule) {
    if (rule.startsWith('import:')) {
        const shortName = basename(rule.replace('import:', ''));
        
        return shortName.replace('plugin-', '');
    }
    
    return rule;
}
