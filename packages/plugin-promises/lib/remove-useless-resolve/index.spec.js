import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['promises/remove-useless-resolve', convert],
    ],
});

test('plugin-remove-useless-resolve: exports: report: resolve', (t) => {
    t.report('resolve', `'resolve()' is useless in 'async' functions, use 'return' instead`);
    t.end();
});

test('plugin-remove-useless-resolve: transform: resolve', (t) => {
    t.transform('resolve');
    t.end();
});

test('plugin-remove-useless-resolve: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-remove-useless-resolve: transform: await', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-remove-useless-resolve: no transform: not-fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-remove-useless-resolve: no transform: not-async', (t) => {
    t.noTransform('not-async');
    t.end();
});

test('plugin-remove-useless-resolve: no report: not-async', (t) => {
    t.noReport('not-async');
    t.end();
});
