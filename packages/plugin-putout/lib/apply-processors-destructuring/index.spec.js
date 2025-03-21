import {createTest} from '@putout/test';
import * as applyProcessorsDestructuring from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/apply-processors-destructuring', applyProcessorsDestructuring],
    ],
});

test('plugin-putout: apply-processors-destructuring: report: process', (t) => {
    t.report('process', 'Test operator should be destructured');
    t.end();
});

test('plugin-putout: apply-processors-destructuring: transform: process', (t) => {
    t.transform('process');
    t.end();
});

test('plugin-putout: apply-processors-destructuring: transform: no-process', (t) => {
    t.transform('no-process');
    t.end();
});

test('plugin-putout: apply-processors-destructuring: transform: compare-places', (t) => {
    t.transform('compare-places');
    t.end();
});

test('plugin-putout: apply-processors-destructuring: transform: t-end', (t) => {
    t.transform('t-end');
    t.end();
});
