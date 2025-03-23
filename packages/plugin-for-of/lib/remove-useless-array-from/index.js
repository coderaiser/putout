export const report = () => `'Array.from()' has no sense inside 'for...of'`;

export const replace = () => ({
    'for (const __a of Array.from(__b)) __c': 'for (const __a of __b) __c',
});
