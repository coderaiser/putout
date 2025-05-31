export const report = () => `Use strict equal ('===') instead of equal ('==')`;

export const exclude = () => [
    '__ == null',
    '__ != null',
];

export const replace = () => ({
    '__a == __b': '__a === __b',
    '__a != __b': '__a !== __b',
});
