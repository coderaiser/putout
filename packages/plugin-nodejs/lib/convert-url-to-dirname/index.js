import {operator} from 'putout';

const {isESM} = operator;
const not = (fn) => (...a) => !fn(...a);

export const report = () => `Use __dirname instead of 'import.meta.url' in CommonJS`;

export const filter = not(isESM);

export const replace = () => ({
    'new URL(__a, import.meta.url).pathname': 'join(__dirname, __a)',
});
