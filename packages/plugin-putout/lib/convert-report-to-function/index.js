import {types} from 'putout';

const {
    isStringLiteral,
    isTemplateLiteral,
} = types;

export const report = () => `Typeof 'report' should be a 'function'`;

export const match = () => ({
    'module.exports.report = __a': ({__a}) => isStringLiteral(__a) || isTemplateLiteral(__a),
});

export const replace = () => ({
    'module.exports.report = __a': 'module.exports.report = () => __a',
});
