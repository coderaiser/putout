import {operator} from 'putout';

const {addArgs} = operator;

const INCLUDE = [
    '(__a) => __body',
    '() => __body',
];

const EXCLUDE = [
    'export const filter = __a',
    'module.exports.filter = __a',
];

export const {
    report,
    fix,
    traverse,
} = addArgs({
    path: ['vars, path', INCLUDE, EXCLUDE],
});
