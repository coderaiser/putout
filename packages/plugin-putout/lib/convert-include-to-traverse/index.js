import {types} from 'putout';

const {isObjectExpression} = types;

export const report = () => `Use 'traverse' instead of 'include'`;

const check = ({__a}) => {
    return isObjectExpression(__a.body);
};

export const match = () => ({
    'const include = __a': check,
    'module.exports.include = __a': check,
});

export const replace = () => ({
    'const include = __a': 'const traverse = __a',
    'module.exports.include = __a': 'module.exports.traverse = __a',
});
