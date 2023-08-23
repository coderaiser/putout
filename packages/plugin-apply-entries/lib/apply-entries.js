export const report = () => `Use 'entries()' instead of '.entries()`;

export const exclude = () => [
    'const entries = __',
];

export const replace = () => ({
    '__a.entries()': 'entries(__a)',
});
