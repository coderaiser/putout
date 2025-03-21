import {operator} from 'putout';

const {compareAny} = operator;

export const report = () => `Use 'vars' instead of '{}'`;

export const match = () => ({
    '({}, path) => __a': isInsideReplacer,
});

export const replace = () => ({
    '({}, path) => __a': '(vars, path) => __a',
});

const isInsideReplacer = (vars, path) => {
    return compareAny(path, [
        'module.exports.match = __',
        'module.exports.replace = __',
        'export const match = __',
        'export const replace = __',
    ]);
};
