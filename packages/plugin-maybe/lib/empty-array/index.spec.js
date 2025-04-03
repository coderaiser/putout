import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['maybe/apply-async-formatter', convert],
    ],
});

test('plugin-maybe: empty-array: report', (t) => {
    t.report('empty-array', `Use 'maybeEmptyArray()'`);
    t.end();
});

test('plugin-maybe: empty-array: transform', (t) => {
    t.transform('empty-array');
    t.end();
});

test('plugin-maybe: empty-array: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
