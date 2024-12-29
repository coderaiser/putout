'use strict';

const {
    operator,
    template,
    types,
} = require('putout');

const {
    compare,
    getTemplateValues,
} = operator;

const {isBlockStatement} = types;

module.exports.report = () => `Use 'for...of' instead of 'for'`;

const forLoopToN = 'for (let __i = 0; __i < __n; __i++) __c';
const getForOfLoop = template(`for (const LEFT of RIGHT) BODY`);
const assignIterable = (__i) => `const __a = __b[${__i.name}]`;
const assignN = (__n) => `const ${__n.name} = __e.length`;

module.exports.filter = (path) => {
    const {node} = path;
    const prevPath = path.getPrevSibling();
    
    if (!prevPath.node)
        return false;
    
    const {body} = node;
    
    if (!isBlockStatement(body))
        return false;
    
    const [first] = body.body;
    const {__i, __n} = getTemplateValues(path, forLoopToN);
    
    if (!compare(first, assignIterable(__i)))
        return false;
    
    if (!comparePrevSiblings(path, assignN(__n)))
        return false;
    
    const {references} = path.scope.bindings[__i.name];
    
    return references <= 3;
};

module.exports.replace = () => ({
    [forLoopToN]: ({__c, __i}) => {
        const [node] = __c.body;
        const {__a, __b} = getTemplateValues(node, assignIterable(__i));
        
        __c.body.shift();
        
        return getForOfLoop({
            LEFT: __a,
            RIGHT: __b,
            BODY: __c,
        });
    },
});

function comparePrevSiblings(prev, node) {
    while (prev = prev.getPrevSibling()) {
        if (!prev.node)
            return false;
        
        if (compare(prev.node, node))
            return true;
    }
}
