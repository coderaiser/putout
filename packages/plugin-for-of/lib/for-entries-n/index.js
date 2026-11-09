import {
    operator,
    template,
} from 'putout';

const {
    compare,
    getTemplateValues,
    getBinding,
    createTypeChecker,
} = operator;

const isForWithBlock = createTypeChecker([
    ['-: body -> !BlockStatement'],
    ['+: -> ForStatement'],
]);

const isIndexUsedOften = createTypeChecker([
    ['-: constantViolations.length', '>', 1],
    ['+: references', '>', 3],
]);

const isUsedOnce = createTypeChecker([
    ['-: references', '>', 1],
    ['+: path -> VariableDeclarator'],
]);

export const report = () => `Use 'for..of' instead of 'for'`;

const forLoopToN = 'for (let __i = 0; __i < __n; __i++) __c';
const getForOfLoop = template(`for (const [INDEX, LEFT] of RIGHT.entries()) BODY`);
const assignIterable = (__i) => `const __a = __b[${__i.name}]`;
const assignN = (__n) => `const ${__n.name} = __e.length`;

export const filter = (path) => {
    const {node} = path;
    const prevPath = path.getPrevSibling();
    
    if (!prevPath.node)
        return false;
    
    if (!isForWithBlock(node))
        return false;
    
    const [first] = node.body.body;
    const {__i, __n} = getTemplateValues(path, forLoopToN);
    
    if (!isIndexUsedOften(path.scope.bindings[__i.name]))
        return false;
    
    if (!compare(first, assignIterable(__i)))
        return false;
    
    if (!comparePrevSiblings(path, assignN(__n)))
        return false;
    
    return isUsedOnce(getBinding(path, __n.name));
};

export const replace = () => ({
    [forLoopToN]: ({__c, __i}) => {
        const [node] = __c.body;
        const {__a, __b} = getTemplateValues(node, assignIterable(__i));
        
        __c.body.shift();
        
        return getForOfLoop({
            INDEX: __i,
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
