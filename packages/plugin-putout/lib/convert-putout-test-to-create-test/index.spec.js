'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/convert-putout-test-to-create-test': require('.'),
});

test('plugin-putout: convert-putout-test-to-create-test: report', (t) => {
    t.report('putout-test', `Use 'createTest' instead of 'putoutTest'`);
    t.end();
});

test('plugin-putout: convert-putout-test-to-create-test: transform', (t) => {
    t.transform('putout-test');
    t.end();
});

