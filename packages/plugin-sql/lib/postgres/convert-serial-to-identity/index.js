export const report = () => `Use 'IDENTITY' instead of 'SERIAL'`;

export const replace = () => ({
    'column(__a, serial(), __b)': 'column(__a, INTEGER, __b, identity())',
});
