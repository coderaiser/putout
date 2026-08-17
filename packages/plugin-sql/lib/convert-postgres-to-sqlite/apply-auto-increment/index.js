export const report = () => `Use 'AUTOINCREMENT'`;

export const replace = () => ({
    'column(__a, __c, identity(), __b)': 'column(__a, INTEGER, __b, autoIncrement())',
    'column(__a, __c, identityByDefault(), __b)': 'column(__a, INTEGER, __b, autoIncrement())',
    'column(__a, serial(), __b)': 'column(__a, INTEGER, __b, autoIncrement())',
    'column(__a, __b, nextval(__c), __d)': 'column(__a, INTEGER, __d, autoIncrement())',
});
