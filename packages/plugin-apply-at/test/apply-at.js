import {createTest} from '@putout/test';
import * as applyArrayAt from '../lib/apply-at.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-at', applyArrayAt],
    ],
});

test('plugin-apply-at: report: array', (t) => {
    t.report('array', `Use 'Array.at()'`);
    t.end();
});

test('plugin-apply-at: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-apply-at: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-apply-at: no report: not-couple', (t) => {
    t.noReport('not-couple');
    t.end();
});

test('plugin-apply-at: no transform: assignment', (t) => {
    t.noTransform('assignment');
    t.end();
});
