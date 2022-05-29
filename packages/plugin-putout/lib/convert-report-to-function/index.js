'use strict';

const {types} = require('putout');
const {
    isStringLiteral,
    isTemplateLiteral,
} = types;

module.exports.report = () => `Typeof 'report' should be a 'function'`;

module.exports.match = () => ({
    'module.exports.report = __a': ({__a}) => isStringLiteral(__a) || isTemplateLiteral(__a),
});

module.exports.replace = () => ({
    'module.exports.report = __a': 'module.exports.report = () => __a',
});
