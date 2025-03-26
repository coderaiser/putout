import {createTest} from '@putout/test';
import * as tryToCatch from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['try-to-catch', tryToCatch],
    ],
});

test('plugin-try-catch: async: report: try-to-catch', (t) => {
    t.report('try-to-catch', `Use 'await tryToCatch()' instead of 'await' in 'try-catch' block`);
    t.end();
});

test('plugin-try-catch: async: transform: try-to-catch', (t) => {
    t.transform('try-to-catch');
    t.end();
});

test('plugin-try-catch: async: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-try-catch: async: transform: no-error', (t) => {
    t.transform('no-error');
    t.end();
});

test('plugin-try-catch: async: no report: no-await', (t) => {
    t.noReport('no-await');
    t.end();
});

test('plugin-try-catch: async: no report: finalizer', (t) => {
    t.noReport('finalizer');
    t.end();
});
