'use strict';

const {operator} = require('putout');
const {
    compare,
    getTemplateValues,
} = operator;

module.exports.report = () => 'for-of should be used instead of for';

const forLoop = 'for (let __i = 0; __i < __e.length; __i++) __c';
const getForOfLoop = (__a, __b) => `for (const ${__a.name} of ${__b.name}) __c`;
const assignIterable = (__i) => `const __a = __b[${__i.name}]`;
const assignIterableWithName = (__i, __e) => `const __a = ${__e.name}[${__i.name}]`;

module.exports.filter = (path) => {
    const {node} = path;
    
    const {body} = node;
    const [first] = body.body;
    const {__i, __e} = getTemplateValues(node, forLoop);
    const {references} = path.scope.bindings[__i.name];
    
    if (references > 3)
        return false;
    
    return compare(first, assignIterableWithName(__i, __e));
};

module.exports.replace = () => ({
    [forLoop]: (vars) => {
        const {__c, __i} = vars;
        const [node] = __c.body;
        const {__a, __b} = getTemplateValues(node, assignIterable(__i));
        
        __c.body.shift();
        
        return getForOfLoop(__a, __b);
    },
});

