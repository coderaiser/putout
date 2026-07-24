import {operator} from 'putout';

const {addArgs} = operator;

const TEST_ASYNC = [
    'test("__a", async (__args) => __body)',
    'test.only("__a", async (__args) => __body)',
    'test.skip("__a", async (__args) => __body)',
];

export const {
    report,
    fix,
    traverse,
} = addArgs({
    t: ['t', [
        'test("__a", (__args) => __body)',
        'test.only("__a", (__args) => __body)',
        'test.skip("__a", (__args) => __body)',
        ...TEST_ASYNC,
    ]],
    equal: ['{equal}', TEST_ASYNC],
    deepEqual: ['{deepEqual}', TEST_ASYNC],
    notOk: ['{notOk}', TEST_ASYNC],
});
