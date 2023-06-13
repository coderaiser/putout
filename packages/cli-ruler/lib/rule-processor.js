const getRule = (a) => a.rule;

const initRules = (config) => {
    config.rules = config.rules || {};
};

const {keys} = Object;
const {isArray} = Array;

const isTuple = (a) => isArray(a);

const isPutoutRule = (rule) => {
    if (rule.startsWith('parser'))
        return false;
    
    return !rule.includes('(');
};

export const disableAll = (places, config) => {
    initRules(config);
    
    const rules = parseRules(places);
    const existingRules = keys(config.rules);
    
    for (const rule of existingRules)
        disable(rule, config);
    
    for (const rule of rules)
        disable(rule, config);
    
    return config;
};

export function enable(rule, config) {
    initRules(config);
    
    if (!isPutoutRule(rule))
        return config;
    
    config.rules[rule] = 'on';
    
    return config;
}

export function disable(rule, config) {
    initRules(config);
    
    if (!isPutoutRule(rule))
        return config;
    
    if (isTuple(config.rules[rule]))
        config.rules[rule] = ['off', config.rules[rule][1]];
    else
        config.rules[rule] = 'off';
    
    return config;
}

export const enableAll = (places, config) => {
    initRules(config);
    const rules = parseRules(places);
    
    for (const rule of Object.keys(config.rules))
        enable(rule, config);
    
    for (const rule of rules)
        enable(rule, config);
    
    return config;
};

function parseRules(places) {
    return places.map(getRule);
}
