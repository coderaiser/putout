'use strict';

const {parsePluginNames} = require('./parse-plugin-names');
const {enableNestedRules} = require('../rules/parse-rules');

const {parseRules, getLoadedRules} = require('../rules');

module.exports.prepareRules = ({rules, pluginNames}) => {
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
