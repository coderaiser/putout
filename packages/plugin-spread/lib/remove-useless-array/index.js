import {types, operator} from 'putout';

const {isNumericLiteral} = types;
const {createTypeChecker} = operator;
const is = (name) => (a) => a === name;

const checkSpread = createTypeChecker([
    ['+: -> !MemberExpression'],
    ['+: object.name', is('Object')],
    ['-: property.name -> ', is('values')],
    ['-: property.name -> ', is('querySelectorAll')],
]);

export const report = () => `Avoid useless spread '...'`;

export const match = () => ({
    '[...Array(__a)]': ({__a}) => !isNumericLiteral(__a),
    '[...__a(__args)]': ({__a}) => checkSpread(__a),
});

export const replace = () => ({
    '[...(__a ? __b : __c)]': '__a ? __b : __c',
    '[...Array(__a)]': 'Array(__a)',
    'for (const __a of [...__b]) __c': 'for (const __a of __b) __c',
    'Array.from([...__a])': 'Array.from(__a)',
    '[...__a(__args)]': '__a(__args)',
    'new Set([...__a])': 'new Set(__a)',
});
