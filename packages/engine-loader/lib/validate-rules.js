'use strict';

const parse = (rule) => {
    if (rule.startsWith('babel/'))
        return rule;
    
    if (rule.includes('/'))
        return rule.split('/').shift();
    
    return rule;
};

module.exports = ({items, rules}) => {
    const ruleItems = Object.keys(rules);
    
    for (const rule of ruleItems) {
        let isName = false;
        let isWithSlash = false;
        
        for (const [pluginName, plugin = {}] of items) {
            isName = pluginName === rule;
            isWithSlash = pluginName === parse(rule);
            
            if (isName && plugin.rules)
                throw Error(`Rule "${rule}" cannot be applied to nested plugin "${pluginName}"`);
            
            if (isName || isWithSlash)
                break;
        }
        
        if (!isName && !isWithSlash)
            throw Error(`No plugin found for a rule: "${rule}"`);
    }
};

