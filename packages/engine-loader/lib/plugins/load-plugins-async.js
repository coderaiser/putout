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

// The reason we don't use 'Promise.all' here:
//
// Error [ERR_INTERNAL_ASSERTION]: @putout/plugin-apply-at: Unexpected module status 0. Cannot require() ES Module /Users/coderaiser/putout/packages/engine-parser/lib/parser.js because it is not yet fully loaded.
// This may be caused by a race condition if the module is simultaneously dynamically import()-ed via Promise.all().
// Try await-ing the import() sequentially in a loop instead.
//  (From /Users/coderaiser/putout/packages/putout/lib/index.cjs in non-loader-hook thread)
async function loadPlugins({items, loadedRules}) {
    const enabledRules = [];
    const resolvedPlugins = [];
    
    for (const [rule, itemPlugin] of items) {
        if (!isEnabled(rule, loadedRules))
            continue;
        
        checkRule(rule);
        
        const [name] = splitRule(rule);
        const plugin = itemPlugin || await loadPluginAsync(name);
        
        enabledRules.push(parseRuleName(rule));
        resolvedPlugins.push(plugin);
    }
    
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
