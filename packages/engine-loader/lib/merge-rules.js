'use strict';

const defaultOptions = () => Object.create(null);

module.exports.mergeRules = ([rule, plugin], rules) => {
    for (const currentRule of rules) {
        if (currentRule.rule !== rule)
            continue;
        
        const {msg, options} = currentRule;
        
        return {
            rule,
            plugin,
            msg,
            options,
        };
    }
    
    return {
        rule,
        plugin,
        msg: '',
        options: defaultOptions(),
    };
};
