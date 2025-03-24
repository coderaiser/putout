export const report = () => 'IO.move should be used instead of IO.mv';

const mvFrom = `
    IO.mv({
        from: __a,
        to: __b,
        names: __c,
    });
`;

const mvTo = 'IO.move(__a, __b, __c)';

export const replace = () => ({
    [mvFrom]: mvTo,
});
