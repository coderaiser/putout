import {operator} from 'putout';

const {isESM} = operator;

export const report = () => `Use 'createTest(import.meta.url)' instead of 'createTest(__dirname)'`;

export const match = () => ({
    'createTest(__dirname, __a)': (vars, path) => isESM(path),
});

export const replace = () => ({
    'createTest(__dirname, __a)': 'createTest(import.meta.url, __a)',
});
