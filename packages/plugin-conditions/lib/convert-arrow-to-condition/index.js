export const report = () => `Use 'condition' instead of 'arrow function'`;

export const replace = () => ({
    'if (__a => __b) __c': 'if (__a >= __b) __c',
});
