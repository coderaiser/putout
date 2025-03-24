export const report = () => 'IO.copy should be used instead of IO.cp';

const cpFrom = `
    IO.cp({
        from: __a,
        to: __b,
        names: __c,
    });
`;

const cpTo = 'IO.copy(__a, __b, __c)';

export const replace = () => ({
    [cpFrom]: cpTo,
});
