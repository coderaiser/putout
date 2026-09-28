const {entries, keys} = Object;

const cut = (a) => a.split('/')[0];
const isEmpty = (a) => !keys(a).length;
const isNested = (a) => a.includes('/');

const isSuppressed = (matchRules, rule) => {
    if (Object.hasOwn(matchRules, rule))
        return true;
    
    return isNested(rule) && matchRules[cut(rule)] === 'off';
};

export const applyMatchRules = (rules, matchRules = {}) => {
    if (isEmpty(matchRules) || isEmpty(rules))
        return rules;
    
    const result = {};
    
    for (const [rule, value] of entries(rules)) {
        if (!isSuppressed(matchRules, rule))
            result[rule] = value;
    }
    
    return {
        ...result,
        ...matchRules,
    };
};
