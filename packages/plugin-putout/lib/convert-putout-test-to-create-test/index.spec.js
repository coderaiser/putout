import {createTest} from '@putout/test';
import * as convertPutoutTestToCreateTest from './index.js';

const test = createTest(import.meta.url, {
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
