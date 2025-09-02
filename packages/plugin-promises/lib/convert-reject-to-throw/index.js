import {types} from 'putout';

const {isFunction} = types;

export const report = () => 'Reject is useless in async functions, use throw instead';

export const filter = (path) => {
    const fnPath = path.find(isFunction);
    return fnPath?.node.async;
};

export const replace = () => ({
    'return Promise.reject(__a)': 'throw __a',
    'return await Promise.reject(__a)': 'throw __a',
    'async () => Promise.reject(__a)': 'async () => {throw __a}',
});
