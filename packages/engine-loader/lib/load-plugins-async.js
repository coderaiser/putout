'use strict';

const isEnabled = require('./is-enabled');
const parseRules = require('./parse-rules');
const {nanomemoize} = require('nano-memoize');
const {createAsyncLoader} = require('./async-loader');
const parsePluginNames = require('./parse-plugin-names');
const validateRules = require('./validate-rules');
const validatePlugin = require('./validate-plugin');
const {mergeRules} = require('./merge-rules');

const isString = (a) => typeof a === 'string';

module.exports.loadPluginsAsync = nanomemoize(async (options) => {
    check(options);
    
    const {pluginNames = [], rules = {}} = options;
    
    const cookedRules = parseRules(rules);
    const loadedRules = getLoadedRules(cookedRules);
    
    const items = parsePluginNames(pluginNames);
    
    const plugins = await loadPlugins({
        items,
        loadedRules,
    });
    
    validateRules({
        rules,
        items,
    });
    
    const result = [];
    
    // Would be great to have ability to filter
    // disabled plugins and prevent them from loading
    // but we can't because of a way multi-rule plugins
    // works. We can't determine count and names of all
    // rules of a plugin before load.
    for (const [name, plugin] of plugins) {
        if (!isEnabled(name, cookedRules))
            continue;
        
        result.push(mergeRules(
            [name, plugin],
            cookedRules,
        ));
    }
    
    return result;
});

function splitRule(rule) {
    return [rule, 'putout'];
}

async function loadPlugins({items, loadedRules}) {
    const loadPlugin = createAsyncLoader('plugin');
    const promises = [];
    
    for (const [rule, itemPlugin] of items) {
        if (!isEnabled(rule, loadedRules))
            continue;
        
        checkRule(rule);
        
        const [name] = splitRule(rule);
        const plugin = itemPlugin || loadPlugin(name);
        
        promises.push(plugin);
    }
    
    const resolvedPlugins = await Promise.all(promises);
    const plugins = [];
    
    for (const [i, [rule]] of items.entries()) {
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

function getLoadedRules(rules) {
    const loadedRules = [];
    
    for (const item of rules) {
        const {rule} = item;
        
        if (rule.includes('/'))
            continue;
        
        loadedRules.push(item);
    }
    
    return loadedRules;
}

function extendRules(rule, plugin) {
    const result = [];
    const entries = Object.entries(plugin);
    
    for (const [name, plugin] of entries) {
        result.push([`${rule}/${name}`, plugin]);
    }
    
    return result;
}

function check(options) {
    if (!options || typeof options !== 'object')
        throw Error('options should be an object!');
}

function checkRule(rule) {
    if (!isString(rule))
        throw Error(`☝️ Looks like plugin name type is not 'string', but: '${typeof rule}'`);
}
