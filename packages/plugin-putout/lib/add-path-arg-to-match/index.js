import {operator} from 'putout';

const {addArgs} = operator;

export const {
    report,
    fix,
    traverse,
} = addArgs({
    path: ['vars, path', [
        '(__a) => __body',
        '() => __body',
    ]],
});
