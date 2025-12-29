const parseSlashes = (rule) => {
    if (rule.includes('/'))
        return rule
            .split('/')
            .shift();
    
    return rule;
};

const parsePluginName = (a) => {
    return a
        .replace('import:@putout/plugin-', '')
        .replace('@putout/plugin-', '');
};

export const validateRules = ({items, rules}) => {
    const ruleItems = Object.keys(rules);
    
    for (const rule of ruleItems) {
        let isName = false;
        let isWithSlash = false;
        let isIncludes = false;
        
        for (const [pluginName, plugin = {}] of items) {
            const parsedPluginName = parsePluginName(pluginName);
            
            isName = parsedPluginName === rule;
            isWithSlash = parsedPluginName === parseSlashes(rule);
            isIncludes = rule.includes(parsedPluginName);
            
            if (isName && plugin.rules)
                throw Error(`Rule '${rule}' cannot be applied to nested plugin '${pluginName}'`);
            
            if (isName || isWithSlash || isIncludes)
                break;
        }
        
        if (!isName && !isWithSlash && !isIncludes)
            throw Error(`No plugin found for a rule: '${rule}'`);
    }
};
