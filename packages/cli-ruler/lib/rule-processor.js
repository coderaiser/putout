const getRule = (a) => a.rule;
const initRules = (config) => {
    config.rules = config.rules || {};
};

const {keys} = Object;
const {isArray} = Array;

const isTuple = isArray;

const isPutoutRule = (rule) => {
    if (rule.startsWith('parser'))
        return false;
    
    if (rule.includes('('))
        return false;
    
    return true;
};

export const disableAll = (config, places) => {
    initRules(config);
    
    const rules = parseRules(places);
    const existingRules = keys(config.rules);
    
    for (const rule of existingRules)
        disable(config, rule);
    
    for (const rule of rules)
        disable(config, rule);
    
    return config;
};

export function enable(config, rule) {
    initRules(config);
    
    if (!isPutoutRule(rule))
        return config;
    
    config.rules[rule] = 'on';
    
    return config;
}

export function disable(config, rule) {
    initRules(config);
    
    if (!isPutoutRule(rule))
        return config;
    
    if (isTuple(config.rules[rule]))
        config.rules[rule] = ['off', config.rules[rule][1]];
    else
        config.rules[rule] = 'off';
    
    return config;
}

export const enableAll = (config, places) => {
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

