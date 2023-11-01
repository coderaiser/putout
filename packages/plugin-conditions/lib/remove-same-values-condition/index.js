'use strict';

const {operator} = require('putout');
const {
    replaceWith,
    getTemplateValues,
    compare,
} = operator;

module.exports.report = () => `Avoid condition with the same value`;

module.exports.match = () => ({
    'if (__a === __b) __c'({__a, __b}, prev) {
        while (prev = prev.getPrevSibling(), prev.node) {
            if (!compare(prev, 'if (__a !== __b) __c'))
                continue;
            
            const values = getTemplateValues(prev, 'if (__a !== __b) __c');
            
            if (!compare(__a, values.__a))
                continue;
            
            if (!compare(__b, values.__b))
                continue;
            
            return true;
        }
        
        return false;
    },
});

module.exports.replace = () => ({
    'if (__a === __b) __c': (vars, path) => {
        replaceWith(path, path.get('consequent'));
        
        return path;
    },
});
