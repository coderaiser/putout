import {types} from 'putout';

const {isFunction} = types;

export const report = () => `'resolve()' is useless in 'async' functions, use 'return' instead`;

export const filter = (path) => {
    const fnPath = path.find(isFunction);
    return fnPath?.node.async;
};

export const replace = () => ({
    'return Promise.resolve()': 'return',
    'return Promise.resolve(__a)': `return __a`,
    'await Promise.resolve(__a)': `__a`,
});
