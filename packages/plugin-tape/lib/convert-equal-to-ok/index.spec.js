'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/convert-equal-to-ok': require('.'),
});

test('plugin-tape: convert-equal-to-ok: report', (t) => {
    t.report('equal', `Use 't.ok(result)' instead of 't.equal(result, true)'`);
    t.end();
});

test('plugin-tape: convert-equal-to-ok: transform', (t) => {
    t.transform('equal');
    t.end();
});

