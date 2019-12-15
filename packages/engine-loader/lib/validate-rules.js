'use strict';

const shift = ([a]) => a;
const parse = (rule) => {
    if (/^(babel|jscodeshift)\//.test(rule))
        return rule;
    
    if (rule.includes('/'))
        return rule.split('/').shift();
    
    return rule;
};

module.exports = ({items, rules}) => {
    const ruleItems = Object.keys(rules);
    const plugins = items.map(shift);
    
    for (const rule of ruleItems) {
        const isWithSlash = plugins.includes(parse(rule));
        const isName = plugins.includes(rule);
        
        if (!isName && !isWithSlash)
            throw Error(`no plugin found for a rule: "${rule}"`);
    }
};

