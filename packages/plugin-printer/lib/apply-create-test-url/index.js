import {operator} from 'putout';

const {isESM} = operator;

export const report = () => `Use 'import.meta.url' instead of '__dirname'`;

export const match = () => ({
    'const {test, fixture} = createTest(__dirname)': (vars, path) => isESM(path),
});

export const replace = () => ({
    'const {test, fixture} = createTest(__dirname)': 'const {test, fixture} = createTest(import.meta.url)',
});
