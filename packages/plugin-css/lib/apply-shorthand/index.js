const DIMENSION_4 = `
    declaration("__a", valueList([
        dimension(__b, __c),
        dimension(__b, __c),
        dimension(__b, __c),
        dimension(__b, __c),
    ]));
`;

const DIMENSION_1 = 'declaration("__a", valueList([dimension(__b, __c)]))';

export const report = () => `Apply shorthand`;

export const replace = () => ({
    [DIMENSION_4]: DIMENSION_1,
});
