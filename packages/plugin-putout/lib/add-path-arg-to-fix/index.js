import {operator} from 'putout';

const {compare} = operator;
const check = ({__a}) => {
    if (__a.body)
        return __a.body.length > 0;
    
    return compare(__a, 'path.__()');
};

export const report = () => `Add 'path' argument to 'fix'`;

export const match = () => ({
    'const fix = () => __a': check,
    'module.exports.fix = () => __a': check,
});

export const replace = () => ({
    'const fix = () => __a': 'const fix = (path) => __a',
    'module.exports.fix = () => __a': 'module.exports.fix = (path) => __a',
});
