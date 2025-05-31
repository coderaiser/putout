'use strict';

const validatePlugin = require('./validate-plugin');
const {prepareRules} = require('./prepare-rules');

const {isEnabled} = require('../rules');

const {filterEnabledPlugins} = require('./filter-enabled-plugins');
const {check, checkRule} = require('../check');

const {isArray} = Array;

module.exports.loadPlugins = (options) => {
    check(options);
    
    const {pluginNames = [], rules = {}} = options;
    const {
        items,
        loadedRules,
        cookedRules,
    } = prepareRules({
        rules,
        pluginNames,
    });
    
    const plugins = loadPlugins({
        items,
        loadedRules,
    });
    
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
    const {loadPlugin} = require('../load/load');
    
    return loadPlugin({
        name,
        namespace,
    });
}
