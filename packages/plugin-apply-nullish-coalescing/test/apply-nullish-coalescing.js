import {createTest} from '@putout/test';
import * as applyNullishCoalescing from '../lib/apply-nullish-coalescing.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-nullish-coalescing', applyNullishCoalescing],
    ],
});

test('plugin-apply-nullish-coalescing: report', (t) => {
    t.report('null', 'Nullish coalescing should be used');
    t.end();
});

test('plugin-apply-nullish-coalescing: transform: null', (t) => {
    t.transform('null');
    t.end();
});

test('plugin-apply-nullish-coalescing: transform: typeof', (t) => {
    t.transform('typeof');
    t.end();
});

test('plugin-apply-nullish-coalescing: transform: undefined', (t) => {
    t.transform('undefined');
    t.end();
});
