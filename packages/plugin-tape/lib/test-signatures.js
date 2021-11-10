'use strict';

module.exports.TEST = 'test("__a", (t) => __body)';
module.exports.TEST_ASYNC = 'test("__a", async (t) => __body)';
module.exports.TEST_ONLY = 'test.only("__a", (t) => __body)';
module.exports.TEST_ASYNC_ONLY = 'test.only("__a", async (t) => __body)';
module.exports.TEST_SKIP = 'test.skip("__a", (t) => __body)';
module.exports.TEST_ASYNC_SKIP = 'test.skip("__a", async (t) => __body)';
