import {types} from 'putout';

const {isLiteral} = types;

export const report = () => `Use 'COUNT(*)' instead of 'COUNT(1)'`;

export const match = () => ({
    'count(__a)': ({__a}) => isLiteral(__a),
});

export const replace = () => ({
    'count(__a)': `count('*')`,
});
