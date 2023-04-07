'use strict';

const {createTest} = require('@putout/test');
const convertPutoutTestToCreateTest = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/convert-putout-test-to-create-test', convertPutoutTestToCreateTest],
    ],
});

test('plugin-putout: convert-putout-test-to-create-test: report', (t) => {
    t.report('putout-test', `Use 'createTest' instead of 'putoutTest'`);
    t.end();
});

test('plugin-putout: convert-putout-test-to-create-test: transform', (t) => {
    t.transform('putout-test');
    t.end();
});

test('plugin-putout: convert-putout-test-to-create-test: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
