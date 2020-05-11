'use strict';

const {operator} = require('putout');
const {
    compare,
    getTemplateValues,
} = operator;

module.exports.report = () => 'for-of should be used instead of for';

const forLoopToN = 'for (let __i = 0; __i < __n; __i++) __c';
const getForOfLoop = (__a, __b) => `for (const ${__a.name} of ${__b.name}) __c`;
const assignIterable = (__i) => `const __a = __b[${__i.name}]`;
const assignN = (__n) => `const ${__n.name} = __e.length`;

module.exports.filter = (path) => {
    const {node} = path;
    
    const prevPath = path.getPrevSibling();
    
    if (!prevPath.node)
        return false;
    
    const prevNode = prevPath.node;
    const {body} = node;
    
    if (!body.body)
        return false;
    
    const [first] = body.body;
    const {__i, __n} = getTemplateValues(node, forLoopToN);
    const {references} = path.scope.bindings[__i.name];
    
    if (references > 3)
        return false;
    
    if (!compare(first, assignIterable(__i)))
        return false;
    
    if (!compare(prevNode, assignN(__n)))
        return false;
    
    return true;
};

module.exports.replace = () => ({
    [forLoopToN]: (vars, path) => {
        const {__c, __i} = vars;
        const [node] = __c.body;
        const {__a, __b} = getTemplateValues(node, assignIterable(__i));
        
        __c.body.shift();
        path.getPrevSibling().remove();
        
        return getForOfLoop(__a, __b);
    },
});

