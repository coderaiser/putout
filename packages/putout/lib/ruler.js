'use strict';

const getRule = (a) => a.rule;
const initRules = (config) => {
    config.rules = config.rules || {};
};

module.exports.disableAll = (config, places) => {
    initRules(config);
    const rules = parseRules(places);
    
    for (const rule of Object.keys(config.rules))
        disable(config, rule);
    
    for (const rule of rules)
        disable(config, rule);
    
    return config;
};

module.exports.enable = enable;

function enable(config, rule) {
    initRules(config);
    config.rules[rule] = true;
    
    return config;
}

module.exports.disable = disable;
function disable(config, rule) {
    initRules(config);
    config.rules[rule] = false;
    
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

