import {operator} from 'putout';

const {addArgs} = operator;

export const {
    report,
    fix,
    traverse,
} = addArgs({
    trackFile: ['{trackFile}', [
        '(__a, __b) => __body',
        '(__a) => __body',
    ]],
});
