export const report = () => `Avoid useless 'fromEntries |> entries'`;

export const replace = () => ({
    'Object.fromEntries(Object.entries(__a))': '__a',
    'fromEntries(entries(__a))': '__a',
});
