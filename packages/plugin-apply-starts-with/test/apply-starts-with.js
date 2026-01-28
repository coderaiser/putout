import {createTest} from '@putout/test';
import * as applyArrayAt from '../lib/apply-starts-with.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-starts-with', applyArrayAt],
    ],
});

test('plugin-apply-starts-with: report: apply-starts-with', (t) => {
    t.report('apply-starts-with', `Use '.startsWith()' instead of '.indexOf()'`);
    t.end();
});

test('plugin-apply-starts-with: transform: apply-starts-with', (t) => {
    t.transform('apply-starts-with');
    t.end();
});

test('plugin-apply-starts-with: transform: upper-scope', (t) => {
    t.transform('upper-scope');
    t.end();
});

test('plugin-apply-starts-with: no transform: not-assign', (t) => {
    t.noTransform('not-assign');
    t.end();
});

test('plugin-apply-starts-with: no transform: not-declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});
