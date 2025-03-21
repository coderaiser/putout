import {operator} from 'putout';

const {addArgs} = operator;

const {
    report,
    fix,
    traverse,
} = addArgs({
    comparePlaces: ['{comparePlaces}', [
        'test("__a", async (__args) => __body)',
        'test.skip("__a", async (__args) => __body)',
        'test.only("__a", async (__args) => __body)',
    ]],
    process: ['{process}', [
        'test("__a", async (__args) => __body)',
        'test.skip("__a", async (__args) => __body)',
        'test.only("__a", async (__args) => __body)',
    ]],
    noProcess: ['{noProcess}', [
        'test("__a", async (__args) => __body)',
        'test.skip("__a", async (__args) => __body)',
        'test.only("__a", async (__args) => __body)',
    ]],
    progress: ['{progress}', [
        'test("__a", async (__args) => __body)',
        'test.skip("__a", async (__args) => __body)',
        'test.only("__a", async (__args) => __body)',
    ]],
});

export {
    report,
    fix,
    traverse,
};
