export const report = () => `Use 't.match()' instead of 't.ok()'`;

export const exclude = () => [
    't.ok(keys(__a).includes(__b))',
];

export const replace = () => ({
    't.ok(__a.includes(__b))': 't.match(__a, __b)',
    't.ok(__a.includes(__b), __c)': 't.match(__a, __b, __c)',
    't.ok(__a.test(__b))': 't.match(__b, __a)',
    't.ok(__a.test(__b), __c)': 't.match(__b, __a, __c)',
});
