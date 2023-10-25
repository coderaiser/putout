'use strict';

const {isEnabled, mergeRules} = require('../rules');

// Would be great to have ability to filter// disabled plugins and prevent them from loading// but we can't because of a way multi-rule plugins// works. We can't determine count and names of all// rules of a plugin before load.
module.exports.filterEnabledPlugins = ({plugins, cookedRules}) => {
    const result = [];
    
    for (const [name, plugin] of plugins) {
        if (!isEnabled(name, cookedRules))
            continue;
        
        result.push(mergeRules(
            [name, plugin],
            cookedRules,
        ));
    }
    
    return result;
};
