'use strict';

module.exports = (rules) => {
    return (name) => {
        const value = rules[name];
        
        if (typeof value === 'boolean')
            return value;
        
        const entries = Object.entries(rules);
        for (const [key, value] of entries) {
            if (RegExp(key).test(name))
                return value;
        }
        
        return true;
    };
};

