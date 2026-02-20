import {operator} from 'putout';

const {addArgs} = operator;

export const {
    report,
    fix,
    traverse,
} = addArgs({
    path: ['vars, path', {
        include: [
            '(__a) => __body',
            '() => __body',
        ],
        exclude: [
            'export const filter = __a',
            'module.exports.filter = __a',
        ],
    }],
});
