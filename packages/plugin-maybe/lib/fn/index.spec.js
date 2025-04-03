import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['maybe/apply-async-formatter', convert],
    ],
});

test('plugin-maybe: fn: report', (t) => {
    t.report('fn', `Use 'maybeFn()'`);
    t.end();
});

test('plugin-maybe: fn: transform', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-maybe: fn: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
