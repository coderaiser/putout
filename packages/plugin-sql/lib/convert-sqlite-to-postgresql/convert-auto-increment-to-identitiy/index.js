export const report = () => 'Replace INTEGER + autoIncrement with identity for PostgreSQL';

export const replace = () => ({
    'column(__a, INTEGER, __b, autoIncrement())': 'column(__a, INTEGER, __b, identity())',
});
