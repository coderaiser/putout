'use strict';

const {
    operator,
    types,
    template,
} = require('putout');

const {
    compare,
    getTemplateValues,
} = operator;

const {isBlockStatement} = types;

module.exports.report = () => `Use 'for...of' instead of 'for'`;

const forLoop = 'for (let __i = 0; __i < __e.length; __i++) __c';
const getForOfLoop = template(`for (const [INDEX, ITEM] of ITEMS.entries()) BODY`);
const assignIterable = (__i) => `const __a = __b[${__i.name}]`;
const assignIterableWithName = (__i, __e) => `const __a = ${__e.name}[${__i.name}]`;

module.exports.filter = (path) => {
    const {node} = path;
    const {body} = node;
    
    if (!isBlockStatement(body))
        return false;
    
    const [first] = body.body;
    const {__i, __e} = getTemplateValues(path, forLoop);
    const {bindings} = path.scope;
    const iBinding = bindings[__i.name];
    
    if (iBinding.constantViolations.length > 1)
        return false;
    
    const {references} = path.scope.bindings[__i.name];
    
    if (references < 4)
        return false;
    
    return compare(first, assignIterableWithName(__i, __e));
};

module.exports.replace = () => ({
    [forLoop]: ({__c, __i}) => {
        const [node] = __c.body;
        const {__a, __b} = getTemplateValues(node, assignIterable(__i));
        
        __c.body.shift();
        
        return getForOfLoop({
            INDEX: __i,
            ITEM: __a,
            ITEMS: __b,
            BODY: __c,
        });
    },
});
