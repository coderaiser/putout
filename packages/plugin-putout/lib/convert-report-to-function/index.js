import {types} from 'putout';

const {
    isStringLiteral,
    isTemplateLiteral,
} = types;

const check = ({__a}) => isStringLiteral(__a) || isTemplateLiteral(__a);

export const report = () => `Typeof 'report' should be a 'function'`;

export const match = () => ({
    'module.exports.report = __a': check,
    'export const report = __a': check,
});

export const replace = () => ({
    'module.exports.report = __a': 'module.exports.report = () => __a',
    'export const report = __a': 'export const report = () => __a',
});
