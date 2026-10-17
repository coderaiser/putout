export const report = () => `Avoid useless '??'`;

export const replace = () => ({
    '__a ?? undefined': '__a',
});
