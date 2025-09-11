export const report = () => `Avoid useless '!'`;

export const replace = () => ({
    '!(__a > __b)': '__a <= __b',
    '!(__a !== __b && __c === __d)': '__a === __b || __c !== __d',
    '!(__a !== __b || __c !== __d)': '__a === __b && __c === __d',
    '!(__a || __b)': '!__a && !__b',
    '!(__a <= __b)': '__a > __b',
});
