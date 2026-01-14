import {parseState} from './parse-rules.js';

const {entries, fromEntries} = Object;
const cut = (a) => a.split('/')[0];

export const enableNestedRules = (rules) => {
    const newRules = new Map();
    
    for (const [rule, value] of entries(rules)) {
        if (newRules.has(rule))
            continue;
        
        if (rule.includes('/') && parseState(rule, value))
            newRules.set(cut(rule), 'on');
        
        newRules.set(rule, value);
    }
    
    return fromEntries(newRules);
};
