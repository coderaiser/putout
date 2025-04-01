export const report = () => `Use '.flatMap()' instead of '.map().flat()'`;

export const replace = () => ({
    '__a.map(__b).flat()': '__a.flatMap(__b)',
});
