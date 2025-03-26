import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/expand-try-catch-arguments', convert],
    ],
});

test('plugin-tape: expand-try-catch-arguments: report: try-catch', (t) => {
    t.report('try-catch', `Expand 'tryCatch()' arguments`);
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: transform: try-catch', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: not-fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-tape: expand-try-catch-arguments: not-call', (t) => {
    t.noTransform('not-call');
    t.end();
});
