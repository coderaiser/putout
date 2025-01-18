'use strict';

const {createTest} = require('@putout/test');
const convertPutoutTestToCreateTest = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/convert-putout-test-to-create-test', convertPutoutTestToCreateTest],
    ],
});

test('plugin-putout: convert-putout-test-to-create-test: report: putout-test', (t) => {
    t.report('putout-test', `Use 'createTest' instead of 'putoutTest'`);
    t.end();
});

test('plugin-putout: convert-putout-test-to-create-test: transform: putout-test', (t) => {
    t.transform('putout-test');
    t.end();
});

test('plugin-putout: convert-putout-test-to-create-test: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
