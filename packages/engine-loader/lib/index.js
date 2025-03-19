'use strict';

const {createAsyncLoader} = require('./load/async-loader');
const {parsePluginNames} = require('./plugins/parse-plugin-names');
const parseProcessorNames = require('./processors/parse-processor-names');
const validatePlugin = require('./plugins/validate-plugin');
const {loadPluginsAsync} = require('./plugins/load-plugins-async');

const {
    parseRules,
    validateRules,
    isEnabled,
    getLoadedRules,
} = require('./rules');

const {filterEnabledPlugins} = require('./plugins/filter-enabled-plugins');
const {check, checkRule} = require('./check');
const {enableNestedRules} = require('./rules/parse-rules');
const {isArray} = Array;

module.exports.loadPluginsAsync = loadPluginsAsync;
module.exports.loadProcessorsAsync = async (options, load) => {
    check(options);
    
    const {processors = []} = options;
    const parsedProcessors = parseProcessorNames(processors);
    const loadProcessor = createAsyncLoader('processor');
    
    const list = [];
    
    for (const [name, fn] of parsedProcessors) {
        if (fn) {
            list.push(fn);
            continue;
        }
        
        list.push(loadProcessor(name, load));
    }
    
    return await Promise.all(list);
};

module.exports.createAsyncLoader = createAsyncLoader;

module.exports.validateRules = (options) => {
    check(options);
    
    const {pluginNames = [], rules = {}} = options;
    const items = parsePluginNames(pluginNames);
    
    validateRules({
        rules,
        items,
    });
};

module.exports.loadPlugins = (options) => {
    check(options);
    
    const {pluginNames = [], rules = {}} = options;
    
    const enabledRules = enableNestedRules(rules);
    const cookedEnabledRules = parseRules(enabledRules);
    const loadedRules = getLoadedRules(cookedEnabledRules);
    
    const items = parsePluginNames(pluginNames);
    const plugins = loadPlugins({
        items,
        loadedRules,
    });
    
    const cookedRules = parseRules(rules);
    return filterEnabledPlugins({
        plugins,
        cookedRules,
    });
};

const splitRule = (rule) => [rule, 'putout'];

const parseRule = (rule) => rule
    .replace('import:@putout/plugin-', '')
    .replace('@putout/plugin-', '');

const maybeFromTuple = (a) => isArray(a) ? a[1] : a;

function loadPlugins({items, loadedRules}) {
    const plugins = [];
    
    for (const [rule, itemPlugin] of items) {
        if (!isEnabled(rule, loadedRules))
            continue;
        
        checkRule(rule);
        const parsedRule = parseRule(rule);
        
        const [name, namespace] = splitRule(rule);
        const plugin = maybeFromTuple(itemPlugin) || loadPlugin({
            name,
            namespace,
        });
        
        validatePlugin({
            plugin,
            rule,
        });
        
        const {rules} = plugin;
        
        if (rules) {
            plugins.push(...extendRules(parsedRule, rules));
            continue;
        }
        
        plugins.push([parsedRule, plugin]);
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

// add support of esm.sh
// https://github.com/esm-dev/esm.sh/issues/1045
function loadPlugin({name, namespace}) {
    const {loadPlugin} = require('./load/load');
    
    return loadPlugin({
        name,
        namespace,
    });
}
