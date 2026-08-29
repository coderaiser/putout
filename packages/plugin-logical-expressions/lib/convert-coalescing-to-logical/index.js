export const report = () => `Use '||' instead of '??'`;

export const replace = () => ({
    '__a ?? __b': '__a || __b',
});
