export const report = () => `Avoid empty array used as 'process()' argument`;

export const replace = () => ({
    'await process(__a, [])': 'await process(__a)',
});
