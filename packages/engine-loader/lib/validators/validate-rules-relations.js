'use strict';

const {parsePluginNames} = require('../plugins/parse-plugin-names');
const {validateRules} = require('../rules');
const {check} = require('../check');

module.exports.validateRulesRelations = (options) => {
    check(options);
    
    const {pluginNames = [], rules = {}} = options;
    const items = parsePluginNames(pluginNames);
    
    validateRules({
        rules,
        items,
    });
};
