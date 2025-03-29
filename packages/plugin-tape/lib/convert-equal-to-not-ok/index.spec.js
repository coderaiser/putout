import {createTest} from '@putout/test';
import * as convertEqualToNotOk from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-equal-to-not-ok', convertEqualToNotOk],
    ],
});

test('plugin-tape: convert-equal-to-not-ok: report: equal', (t) => {
    t.report('equal', `Use 't.notOk(error)' instead of 't.equal(error, null)'`);
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform: equal', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform: undefined', (t) => {
    t.transform('undefined');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform: deep-equal', (t) => {
    t.transform('deep-equal');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform: message', (t) => {
    t.transform('message');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform: bool', (t) => {
    t.transform('bool');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform: not-ok', (t) => {
    t.transform('not-ok');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform: expected', (t) => {
    t.transform('expected');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: no transform: string', (t) => {
    t.noTransform('string');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: no transform: number', (t) => {
    t.noTransform('number');
    t.end();
});
