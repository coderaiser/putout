import {operator} from 'putout';

const {addArgs} = operator;

export const {
    report,
    fix,
    traverse,
} = addArgs({
    t: ['t', [
        'test("__a", (__args) => __body)',
        'test("__a", async (__args) => __body)',
        'test.only("__a", (__args) => __body)',
        'test.only("__a", async (__args) => __body)',
        'test.skip("__a", (__args) => __body)',
        'test.skip("__a", async (__args) => __body)',
    ]],
});
