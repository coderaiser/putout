import {createTest} from '@putout/test';
import * as args from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['args', args],
    ],
});

test('plugin-apply-args: args: report', (t) => {
    t.report('args', `Pass 'fn', then 'args' split by coma`);
    t.end();
});

test('plugin-apply-args: args: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-apply-args: args: member', (t) => {
    t.transform('member');
    t.end();
});

test('plugin-apply-args: args: no report: not-identifier', (t) => {
    t.noReport('not-identifier');
    t.end();
});

test('plugin-apply-args: args: no transform: not-identifier', (t) => {
    t.noTransform('not-identifier');
    t.end();
});

test('plugin-apply-args: args: no transform: bind', (t) => {
    t.noTransform('bind');
    t.end();
});
