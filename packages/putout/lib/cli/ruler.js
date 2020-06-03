'use strict';

const getRule = (a) => a.rule;
const initRules = (config) => {
    config.rules = config.rules || {};
};

const {keys} = Object;
const isCrash = (rule) => /^crash/.test(rule);

module.exports.disableAll = (config, places) => {
    initRules(config);
    const rules = parseRules(places);
    const existingRules = keys(config.rules);
    
    for (const rule of existingRules)
        disable(config, rule);
    
    for (const rule of rules)
        disable(config, rule);
    
    return config;
};

module.exports.enable = enable;

function enable(config, rule) {
    initRules(config);
    
    if (isCrash(rule))
        return config;
    
    config.rules[rule] = 'on';
    
    return config;
}

module.exports.disable = disable;
function disable(config, rule) {
    initRules(config);
    
    if (isCrash(rule))
        return config;
    
    config.rules[rule] = 'off';
    
    return config;
}

module.exports.enableAll = (config, places) => {
    initRules(config);
    const rules = parseRules(places);
    
    for (const rule of Object.keys(config.rules))
        enable(config, rule);
    
    for (const rule of rules)
        enable(config, rule);
    
    return config;
};

function parseRules(places) {
    return places.map(getRule);
}

