export const report = () => '"true" and "false" has no sense in logical expressions';

export const replace = () => ({
    'true && false': 'false',
    'false && true': 'false',
    '__a && true': 'Boolean(__a)',
    'true && __a': '__a',
});
