import {operator} from 'putout';

const {addArgs} = operator;

export const {
    report,
    fix,
    traverse,
} = addArgs({
    crawlFile: ['{crawlFile}', [
        '(__a, __b) => __body',
        '(__a) => __body',
    ]],
});
