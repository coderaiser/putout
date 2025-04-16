import {createTest} from '@putout/test';
import * as removeUselessReturn from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless', removeUselessReturn],
    ],
});

test('plugin-remove-useless: report: return', (t) => {
    t.report('return', `Avoid useless 'return'`);
    t.end();
});

test('plugin-remove-useless: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-remove-useless: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('plugin-remove-useless: transform: declaration', (t) => {
    t.transform('declaration');
    t.end();
});

test('plugin-remove-useless: transform: logic', (t) => {
    t.transform('logic');
    t.end();
});

test('plugin-remove-useless: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-remove-useless: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('plugin-remove-useless: no transform: chain-call', (t) => {
    t.noTransform('chain-call');
    t.end();
});

test('plugin-remove-useless: no transform: await', (t) => {
    t.noTransform('await');
    t.end();
});

test('plugin-remove-useless: no transform: new', (t) => {
    t.noTransform('new');
    t.end();
});

test('plugin-remove-useless: no transform: str', (t) => {
    t.noTransform('str');
    t.end();
});

test('plugin-remove-useless: no transform: not-simple-args', (t) => {
    t.noTransform('not-simple-args');
    t.end();
});

test('plugin-remove-useless: no transform: no-return', (t) => {
    t.noTransform('no-return');
    t.end();
});

test('plugin-remove-useless: no transform: member', (t) => {
    t.noTransform('member');
    t.end();
});

test('plugin-remove-useless: no transform: comment', (t) => {
    t.noTransform('comment');
    t.end();
});

test('plugin-remove-useless: no transform: long', (t) => {
    t.noTransform('long');
    t.end();
});

test('plugin-remove-useless: no report: block', (t) => {
    t.noReport('block');
    t.end();
});
