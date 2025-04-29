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
