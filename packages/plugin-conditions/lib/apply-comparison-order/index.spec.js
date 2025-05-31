import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['conditions/apply-comparison-order', plugin],
    ],
});

test('plugin-conditions: apply-comparison-order: report: order', (t) => {
    t.report('order', `Swap '[]' with 'a'`);
    t.end();
});

test('plugin-conditions: apply-comparison-order: transform: order', (t) => {
    t.transform('order');
    t.end();
});

test('plugin-apply-comparison-order: no transform: inc', (t) => {
    t.noTransform('inc');
    t.end();
});

test('plugin-apply-comparison-order: no transform: not-logical', (t) => {
    t.noTransform('not-logical');
    t.end();
});

test('plugin-apply-comparison-order: no transform: simple-right', (t) => {
    t.noTransform('simple-right');
    t.end();
});

test('plugin-apply-comparison-order: no transform: chain', (t) => {
    t.noTransform('chain');
    t.end();
});

test('plugin-apply-comparison-order: no report: shift', (t) => {
    t.noReport('shift');
    t.end();
});
