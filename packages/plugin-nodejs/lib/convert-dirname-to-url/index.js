import {operator} from 'putout';

const {isESM} = operator;

export const report = () => `Use 'import.meta.url' instead of '__dirname'`;

export const filter = isESM;

export const replace = () => ({
    'join(__dirname, __a)': 'new URL(__a, import.meta.url).pathname',
    'path.join(__dirname, __a)': 'new URL(__a, import.meta.url).pathname',
});
