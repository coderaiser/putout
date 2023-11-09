'use strict';

const {isEnabled, mergeRules} = require('../rules');

const {isArray} = Array;
const maybeTuple = (a) => isArray(a) ? a : ['on', a];

// Would be great to have ability to filter
// disabled plugins and prevent them from loading
// but we can't because of a way multi-rule plugins
// works. We can't determine count and names of all
// rules of a plugin before load.
module.exports.filterEnabledPlugins = ({plugins, cookedRules}) => {
    const result = [];
    
    for (const [name, plugin] of plugins) {
        if (!isEnabled(name, cookedRules))
            continue;
        
        const [status, currentPlugin] = maybeTuple(plugin);
        
        if (!isExectRuleEnabled(name, status, cookedRules))
            continue;
        
        result.push(mergeRules(
            [name, currentPlugin],
            cookedRules,
        ));
    }
    
    return result;
};

function isExectRuleEnabled(name, status, rules) {
    if (status === 'on')
        return true;
    
    for (const {rule, state} of rules) {
        if (rule.includes('/') && RegExp(`^${rule}`).test(name))
            return state;
    }
    
    return false;
}
