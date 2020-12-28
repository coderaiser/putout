'use strict';

const {operator, template} = require('putout');
const {
    compare,
    getTemplateValues,
} = operator;

module.exports.report = () => 'for-of should be used instead of for';

const forLoopToN = 'for (let __i = 0; __i < __n; __i++) __c';
const getForOfLoop = template(`for (const LEFT of RIGHT) BODY`);
const assignIterable = (__i) => `const __a = __b[${__i.name}]`;
const assignN = (__n) => `const ${__n.name} = __e.length`;

const hasReferences = (path) => keys(path.get('init.declarations.0.id').scope.references).length;

const {keys} = Object;

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
    
    if (!compare(first, assignIterable(__i)))
        return false;
    
    if (!compare(prevNode, assignN(__n)))
        return false;
    
    const bindings = path.scope.bindings[__i.name];
    
    if (!bindings && !hasReferences(path))
        return true;
    
    const {references} = bindings;
    
    if (references > 3)
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
        
        return getForOfLoop({
            LEFT: __a,
            RIGHT: __b,
            BODY: __c,
        });
    },
});

