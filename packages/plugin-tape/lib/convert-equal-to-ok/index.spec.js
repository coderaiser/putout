'use strict';

const {createTest} = require('@putout/test');
const convertEqualToOk = require('.');

const test = createTest(__dirname, {
    'tape/convert-equal-to-ok': convertEqualToOk,
});

test('plugin-tape: convert-equal-to-ok: report', (t) => {
    t.report('equal', `Use 't.ok(result)' instead of 't.equal(result, true)'`);
    t.end();
});

test('plugin-tape: convert-equal-to-ok: transform', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-tape: convert-equal-to-ok: transform: expected', (t) => {
    t.transform('expected');
    t.end();
});

test('plugin-tape: convert-equal-to-ok: no transform: false', (t) => {
    t.noTransform('false');
    t.end();
});
