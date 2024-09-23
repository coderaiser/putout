'use strict';

const {types} = require('putout');
const {
    isBooleanLiteral,
    isNumericLiteral,
} = types;

module.exports.report = () => 'Avoid useless constructor';

module.exports.match = () => ({
    'Boolean(__a)': ({__a}) => isBooleanLiteral(__a),
    'Number(__a)': ({__a}) => isNumericLiteral(__a),
});

module.exports.replace = () => ({
    'String("__a")': '__a',
    'Boolean(__a)': '__a',
    'Number(__a)': '__a',
});
