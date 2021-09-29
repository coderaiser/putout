'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/convert-equal-to-not-ok': require('.'),
});

test('plugin-tape: convert-equal-to-not-ok: report', (t) => {
    t.report('equal', `Use 't.notOk(error)' instead of 't.equal(error, null)'`);
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform', (t) => {
    t.transform('equal');
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
