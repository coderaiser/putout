import {operator} from 'putout';

const {compare, __markdown} = operator;

const DEPS = [
    'DependencyStatusURL',
    'DependencyStatusIMGURL',
];

export const report = () => `Avoid 'dependencies' status badge`;

export const match = () => ({
    'definition(__a, __b)': ({__a}, {parentPath}) => {
        const {value} = __a;
        
        if (!compare(parentPath.parentPath, __markdown))
            return false;
        
        return DEPS.includes(value);
    },
});

export const replace = () => ({
    'definition(__a, __b)': '',
});
