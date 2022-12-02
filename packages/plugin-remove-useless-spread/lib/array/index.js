'use strict';

const {types} = require('putout');

const {isNumericLiteral} = types;

module.exports.report = () => `Avoid useless spread '...'`;

module.exports.match = () => ({
    '[...Array(__a)]': ({__a}) => !isNumericLiteral(__a),
});

module.exports.replace = () => ({
    '[...Array(__a)]': 'Array(__a)',
    'for (const __a of [...__b]) __c': 'for (const __a of __b) __c',
    'Array.from([...__a])': 'Array.from(__a)',
    '[...__a(__args)]': '__a(__args)',
    'new Set([...__a])': 'new Set(__a)',
});

