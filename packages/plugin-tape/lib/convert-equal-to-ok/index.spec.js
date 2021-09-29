'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/convert-equal-to-ok': require('.'),
});

test('plugin-tape: convert-equal-to-ok: report', (t) => {
    t.report('equal', `Use 't.ok()' instead of 't.equal()' or 't.deepEqual()'`);
    t.end();
});

test('plugin-tape: convert-equal-to-ok: transform', (t) => {
    t.transform('equal');
    t.end();
});

