import {createRequire} from '../module.js';
import validatePlugin from './validate-plugin.js';
import {prepareRules} from './prepare-rules.js';
import {isEnabled} from '../rules/index.js';
import {filterEnabledPlugins} from './filter-enabled-plugins.js';
import {check, checkRule} from '../check/index.js';

const {isArray} = Array;

export const loadPlugins = (options) => {
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
    
    const plugins = loadAllPlugins({
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

function loadAllPlugins({items, loadedRules}) {
    const plugins = [];
    
    for (const [rule, itemPlugin] of items) {
        if (!isEnabled(rule, loadedRules))
            continue;
        
        checkRule(rule);
        const parsedRule = parseRule(rule);
        
        const [name, namespace] = splitRule(rule);
        const plugin = maybeFromTuple(itemPlugin) || loadOnePlugin({
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
function loadOnePlugin({name, namespace}) {
    const require = createRequire(import.meta.url);
    const {loadPlugin} = require('../load/load.js');
    
    return loadPlugin({
        name,
        namespace,
    });
}
