import {createTest} from '@putout/test';
import * as applyUtilityTypes from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-guards', applyUtilityTypes],
    ],
});

test('plugin-apply-guards: report: apply-type-guards', (t) => {
    t.report('apply-type-guards', `Use 'type guards'`);
    t.end();
});

test('plugin-apply-guards: transform: apply-type-guards', (t) => {
    t.transform('apply-type-guards');
    t.end();
});

test('plugin-apply-guards: no report: exists', (t) => {
    t.noReport('exists');
    t.end();
});

test('plugin-apply-guards: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-apply-guards: transform: is-number', (t) => {
    t.transform('is-number');
    t.end();
});

test('plugin-apply-guards: no report: is-number-with-type-guard', (t) => {
    t.noReport('is-number-with-type-guard');
    t.end();
});

test('plugin-apply-guards: transform: identifier-and', (t) => {
    t.transform('identifier-and');
    t.end();
});
