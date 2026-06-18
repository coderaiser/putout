import {parsePluginNames} from '../plugins/parse-plugin-names.js';
import {validateRules} from '../rules/index.js';
import {check} from '../check/index.js';

const {entries} = Object;
const {isArray} = Array;
const {stringify} = JSON;

const isBoolean = (a) => typeof a === 'boolean';

export const validateRulesRelations = (options) => {
    check(options);
    
    const {
        pluginNames = [],
        rules = {},
    } = options;
    
    const items = parsePluginNames(pluginNames);
    
    validateRules({
        rules,
        items,
    });
    
    validateState(rules);
};

function validateState(rules) {
    for (const [, options] of entries(rules)) {
        if (!isArray(options))
            continue;
        
        const [state] = options;
        
        if (/^(on|off)$/.test(state))
            continue;
        
        if (isBoolean(state))
            continue;
        
        throw Error(`☝️ Looks like 'state' not 'boolean | 'on' | 'off', but: '${stringify(state)}'`);
    }
}
