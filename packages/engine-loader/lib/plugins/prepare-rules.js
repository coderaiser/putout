import {parsePluginNames} from './parse-plugin-names.js';
import {enableNestedRules} from '../rules/enable-nested-rules.js';
import {parseRules, getLoadedRules} from '../rules/index.js';

export const prepareRules = ({rules, pluginNames}) => {
    const enabledRules = enableNestedRules(rules);
    const cookedEnabledRules = parseRules(enabledRules);
    const loadedRules = getLoadedRules(cookedEnabledRules);
    const items = parsePluginNames(pluginNames);
    const cookedRules = parseRules(rules);
    
    return {
        items,
        loadedRules,
        cookedRules,
    };
};
