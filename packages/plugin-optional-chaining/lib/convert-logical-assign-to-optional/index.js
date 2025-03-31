export const report = () => `Use optional expression ('a?.b = c') instead of 'condition' ('a && a.b = c')`;

export const replace = () => ({
    'if (__a) {__a.__b = __c}': '__a?.__b = __c',
    'if (__a) __a.__b = __c': '__a?.__b = __c',
    '__a && (__a.__b = __c)': '__a?.__b = __c',
});
