import {types} from 'putout';

const {
    isBooleanLiteral,
    isNumericLiteral,
} = types;

export const report = () => 'Avoid useless constructor';

export const match = () => ({
    'Boolean(__a)': ({__a}) => isBooleanLiteral(__a),
    'Number(__a)': ({__a}) => isNumericLiteral(__a),
});

export const replace = () => ({
    'String("__a")': '__a',
    'Boolean(__a)': '__a',
    'Number(__a)': '__a',
});
