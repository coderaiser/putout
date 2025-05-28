import {createTest} from '@putout/test';
import * as removeUnreachableCode from '../lib/remove-unreachable-code.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-unreachable-code', removeUnreachableCode],
    ],
});

test('plugin-remove-unreachable-code: report: return', (t) => {
    t.report('return', 'Avoid unreachable code');
    t.end();
});

test('plugin-remove-unreachable-code: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-remove-unreachable-code: transform: throw', (t) => {
    t.transform('throw');
    t.end();
});

test('plugin-remove-unreachable-code: no transform: hoist', (t) => {
    t.noTransform('hoist');
    t.end();
});

test('plugin-remove-unreachable-code: no report: return-no-arg', (t) => {
    t.noReport('return-no-arg');
    t.end();
});

test('plugin-remove-unreachable-code: transform: hoist-and-other', (t) => {
    t.transform('hoist-and-other');
    t.end();
});

test('plugin-remove-unreachable-code: transform: backtrack-normal', (t) => {
    t.transform('backtrack-normal');
    t.end();
});

test('plugin-remove-unreachable-code: report: backtrack-normal', (t) => {
    t.report('backtrack-normal', [
        'Avoid unreachable code',
        'Avoid unreachable code',
        'Avoid unreachable code',
        'Avoid unreachable code',
    ]);
    t.end();
});

test('plugin-remove-unreachable-code: no report: backtrack-func', (t) => {
    t.noReport('backtrack-func');
    t.end();
});
