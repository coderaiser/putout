import {operator} from 'putout';

const {isESM} = operator;

export const report = () => `Use 'createTest(__dirname)' instead of 'createTest(import.meta.url)' in CommonJS'`;

export const match = () => ({
    'createTest(import.meta.url, __a)': (vars, path) => !isESM(path),
});

export const replace = () => ({
    'createTest(import.meta.url, __a)': 'createTest(__dirname, __a)',
});
