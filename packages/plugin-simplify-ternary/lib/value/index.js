import {operator} from 'putout';

const {compare} = operator;

export const report = () => 'Simplify ternary';

export const filter = (path) => {
    const {parentPath} = path;
    
    if (compare(path, '__a = __b ? __a : __d'))
        return parentPath.isExpressionStatement();
    
    if (compare(path, '__a = __b ? __d : __a'))
        return parentPath.isExpressionStatement();
    
    return !parentPath.isJSXExpressionContainer();
};

export const replace = () => ({
    '__a ? __a : __b': '__a || __b',
    '__a?.__b ? __a.__b : __c': '__a?.__b || __c',
    '__a ? __b : __a': '__a && __b',
    '__a ? __b : __b ': '__b',
    '__a ? false : true': '!__a',
    '__a ? __b : false': '__a && __b',
    '__a = __b ? __a : __d': 'if (!__b) __a = __d',
    '__a = __b ? __d : __a': 'if (__b) __a = __d',
    '__a ? __b && __c : __b && __d': '__b && __a ? __c : __d',
    '__a ? __b || __c : __b || __d': '__b || __a ? __c : __d',
    'isUndefined(__a) ? __b : __a': '__a || __b',
});
