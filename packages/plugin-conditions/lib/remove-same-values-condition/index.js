'use strict';

const {operator} = require('putout');
const {
    getTemplateValues,
    compare,
    traverse,
} = operator;

module.exports.report = () => `Avoid condition with the same value`;

module.exports.match = () => ({
    'if (__a === __b) __c': check('if (__a !== __b) __c'),
    'if (__a !== __b) __c': check('if (__a === __b) __c'),
});

module.exports.replace = () => ({
    'if (__a === __b) __c': '__c',
    'if (__a !== __b) __c': '__c',
});

const check = (template) => ({__a, __b}, prev) => {
    while ((prev = prev.getPrevSibling(), prev.node)) {
        if (!compare(prev, template))
            continue;
        
        const values = getTemplateValues(prev, template);
        
        if (!compare(__a, values.__a))
            continue;
        
        if (!compare(__b, values.__b))
            continue;
        
        if (!hasContinue(prev))
            continue;
        
        return true;
    }
    
    return false;
};

function hasContinue(path) {
    let is = false;
    
    traverse(path, {
        ContinueStatement(path) {
            is = true;
            path.stop();
        },
    });
    
    return is;
}
