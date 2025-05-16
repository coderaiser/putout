import {types} from 'putout';

const {isSpreadElement} = types;

export const report = () => `Avoid useless 'Object.assign()'`;

export const match = () => ({
    'Object.assign(__a)': ({__a}) => !isSpreadElement(__a),
    'assign(__a)': ({__a}) => !isSpreadElement(__a),
});

export const replace = () => ({
    'Object.assign(__a)': '__a',
    'Object.assign(__a, {})': '__a',
    'assign(__a)': '__a',
    'assign(__a, {})': '__a',
});
