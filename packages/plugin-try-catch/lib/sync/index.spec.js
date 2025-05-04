import {createTest} from '@putout/test';
import * as tryCatch from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['try-catch', tryCatch],
    ],
});

test('plugin-apply-try-catch: try-catch: report', (t) => {
    t.report('try-catch', `Use 'tryCatch()' instead of 'try..catch' block`);
    t.end();
});

test('plugin-apply-try-catch: try-catch: transform: try-catch', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-apply-try-catch: try-catch: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-apply-try-catch: try-catch: no transform: no-call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('plugin-apply-try-catch: try-catch: no transform: finally', (t) => {
    t.noTransform('finally');
    t.end();
});

test('plugin-apply-try-catch: try-catch: no report: member', (t) => {
    t.noReport('member');
    t.end();
});
