import {parsePluginNames} from '../plugins/parse-plugin-names.js';
import {validateRules} from '../rules/index.js';
import {check} from '../check/index.js';

export const validateRulesRelations = (options) => {
    check(options);
    
    const {pluginNames = [], rules = {}} = options;
    const items = parsePluginNames(pluginNames);
    
    validateRules({
        rules,
        items,
    });
};
