export const report = () => `Remove useless '.entries()'`;

export const replace = () => ({
    'for (const [, __a] of __b.entries()) __c': 'for (const __a of __b) __c',
    'for (let [, __a] of __b.entries()) __c': 'for (let __a of __b) __c',
});
