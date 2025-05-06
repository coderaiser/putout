import {operator} from 'putout';

const {compute} = operator;

const isNumber = (a) => typeof a === 'number';

export const report = () => `Use 'Buffer.alloc()' or 'Buffer.from()' instead of 'Buffer()' and 'new Buffer()'`;

export const replace = () => ({
    'new Buffer(__a)': transform,
    'new Buffer(__a, __b)': transform,
    'Buffer(__a)': transform,
});

function transform({__b}, path) {
    const [, value] = compute(path.get('arguments.0'));
    
    if (isNumber(value))
        return 'Buffer.alloc(__a)';
    
    if (__b)
        return 'Buffer.from(__a, __b)';
    
    return 'Buffer.from(__a)';
}
