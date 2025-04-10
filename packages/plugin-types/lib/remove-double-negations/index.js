export const report = () => `Avoid double negations in conditions`;

export const filter = ({parentPath}) => !parentPath.isJSXExpressionContainer();

export const replace = () => ({
    'if (!!__a) __b': 'if (__a) __b',
    '!!__a ? __b : __c': '__a ? __b : __c',
    '!!__a && __b': '__a && __b',
    '!!__a.includes(__b)': '__a.includes(__b)',
    '!!__a.startsWith(__b)': '__a.startsWith(__b)',
    
    'while(!!__a) __b': 'while(__a) __b',
    'do __a; while(!!__b)': 'do __a; while(__b)',
    'for (__a; !!__b; __c) __d': 'for (__a; __b; __c) __d',
});
