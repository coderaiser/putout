import {types} from 'putout';

const {isObjectExpression} = types;

export const report = () => `Pass env object directly only as the last argument`;

export const match = () => ({
    '() => [__object, __a]': ({__a}) => !isObjectExpression(__a),
});

export const replace = () => ({
    '() => [__object, __a]': '() => [__a, __object]',
});
