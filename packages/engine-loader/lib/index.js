'use strict';

const memo = require('nano-memoize');

const isEnabled = require('./is-enabled');
const loadPlugin = require('./load-plugin');
const parsePluginNames = require('./parse-plugin-names');
const parseRules = require('./parse-rules');
const validateRules = require('./validate-rules');

const defaultOptions = () => Object.create(null);
const mergeRules = ([rule, plugin], rules) => {
    for (const currentRule of rules) {
        if (currentRule.rule !== rule)
            continue;
        
        const {
            msg,
            options,
        } = currentRule;
        
        return {
            rule,
            plugin,
            msg,
            options,
        };
    }
    
    return {
        rule,
        plugin,
        msg: '',
        options: defaultOptions(),
    };
};

module.exports.loadPlugins = memo(load);

function load(options) {
    check(options);
    
    const {
        pluginNames = [],
        cache = true,
        rules = {},
    } = options;
    
    const cookedRules = parseRules(rules);
    const loadedRules = getLoadedRules(cookedRules);
    
    const items = parsePluginNames(pluginNames);
    const plugins = loadPlugins({
        items,
        cache,
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
    for (const plugin of plugins) {
        if (!isEnabled(plugin, cookedRules))
            continue;
        
        result.push(mergeRules(plugin, cookedRules));
    }
    
    return result;
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

function splitRule(rule) {
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

function loadPlugins({items, cache, loadedRules}) {
    const plugins = [];
    
    for (const [rule, itemPlugin] of items) {
        if (!isEnabled(rule, loadedRules))
            continue;
        
        const [name, namespace] = splitRule(rule);
        
        const plugin = itemPlugin || loadPlugin({
            name,
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
    
    for (const [name, plugin] of entries) {
        result.push([
            `${rule}/${name}`,
            plugin,
        ]);
    }
    
    return result;
}

function check(options) {
    if (!options || typeof options !== 'object')
        throw Error('options should be an object!');
}

