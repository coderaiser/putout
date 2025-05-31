import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-same-values-condition', plugin],
    ],
});

test('packages: remove-same-values-condition: report', (t) => {
    t.report('remove-same-values-condition', `Avoid condition with the same value`);
    t.end();
});

test('packages: remove-same-values-condition: transform', (t) => {
    t.transform('remove-same-values-condition');
    t.end();
});

test('packages: remove-same-values-condition: transform: reverse', (t) => {
    t.transform('reverse');
    t.end();
});

test('packages: remove-same-values-condition: no transform: infinite-loop', (t) => {
    t.noTransform('infinite-loop');
    t.end();
});

test('packages: remove-same-values-condition: no transform: different', (t) => {
    t.noTransform('different');
    t.end();
});

test('packages: remove-same-values-condition: no transform: no-continue', (t) => {
    t.noTransform('no-continue');
    t.end();
});
