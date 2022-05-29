'use strict';

const {types} = require('putout');
const {isSpreadElement} = types;

module.exports.report = () => `Avoid useless 'Object.assign()'`;

module.exports.match = () => ({
    'Object.assign(__a)': ({__a}) => !isSpreadElement(__a),
    'assign(__a)': ({__a}) => !isSpreadElement(__a),
});

module.exports.replace = () => ({
    'Object.assign(__a)': '__a',
    'Object.assign(__a, {})': '__a',
    'assign(__a)': '__a',
    'assign(__a, {})': '__a',
});

