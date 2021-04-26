'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/convert-equal-to-not-ok': require('.'),
});

test('plugin-tape: convert-equal-to-not-ok: report', (t) => {
    t.report('equal', 't.notOk should be used instead of t.equal');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-tape: convert-equal-to-not-ok: transform: message', (t) => {
    t.transform('message');
    t.end();
});

