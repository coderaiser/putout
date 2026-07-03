import {template, operator} from 'putout';

const {
    remove,
    getBinding,
    compareAny,
    compare,
    getTemplateValues,
} = operator;

const getForOfLoop = template(`for (const LEFT of RIGHT) BODY`);
const assignIterable = (__i) => `const __a = __b[${__i.name}]`;

const incI = [
    '__i = __i + 1',
    '++__i',
    '__i++',
];

const WHILE = 'while (__i < __n) {__body}';

export const report = () => `Use 'for..of' instead of 'while'`;

export const filter = (path) => {
    const {node} = path;
    const prevPath = path.getPrevSibling();
    
    if (!prevPath.node)
        return false;
    
    const {body} = node;
    
    const first = body.body.at(0);
    const last = body.body.at(-1);
    
    const {__i} = getTemplateValues(path, WHILE);
    
    if (!compare(first, assignIterable(__i)))
        return false;
    
    if (!compareAny(last, incI))
        return false;
    
    const {references} = getBinding(path, __i.name);
    
    return references <= 3;
};

export const replace = () => ({
    [WHILE]: ({__body, __i}, path) => {
        const {__a, __b} = getTemplateValues(__body.body.at(0), assignIterable(__i));
        
        __body.body.shift();
        __body.body.pop();
        
        const prev = path.getPrevSibling();
        
        remove(prev);
        
        return getForOfLoop({
            LEFT: __a,
            RIGHT: __b,
            BODY: __body,
        });
    },
});
