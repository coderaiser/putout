import {operator} from 'putout';

const {addArgs} = operator;

export const {
    report,
    fix,
    traverse,
} = addArgs({
    push: ['{push}', {
        include: [
            '(__a, __b) => __body',
            '(__a) => __body',
        ],
        exclude: [
            '(path) => __body',
        ],
    }],
});
