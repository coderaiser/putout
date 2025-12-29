import {basename} from 'node:path';
import {isEnabled} from '../rules/index.js';
import {prepareRules} from './prepare-rules.js';
import validatePlugin from './validate-plugin.js';
import {filterEnabledPlugins} from './filter-enabled-plugins.js';
import {createAsyncLoader} from '../load/async-loader.js';
import {check, checkRule} from '../check/index.js';

const loadPluginAsync = createAsyncLoader('plugin');

export const loadPluginsAsync = async (options) => {
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
