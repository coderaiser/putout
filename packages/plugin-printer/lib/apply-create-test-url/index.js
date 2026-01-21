import {operator} from 'putout';

const {isESM} = operator;

export const report = () => `Use 'import.meta.url' instead of '__dirname'`;

export const match = () => ({
    'createTest(__dirname)': (vars, path) => isESM(path),
});

export const replace = () => ({
    'createTest(__dirname)': 'createTest(import.meta.url)',
});
