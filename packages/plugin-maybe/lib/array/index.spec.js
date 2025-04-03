import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['maybe/array', convert],
    ],
});

test('plugin-maybe: array: report', (t) => {
    t.report('array', `Use 'maybeArray()'`);
    t.end();
});

test('plugin-maybe: array: transform', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-maybe: array: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
