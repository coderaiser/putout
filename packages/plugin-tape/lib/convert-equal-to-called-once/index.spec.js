'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/convert-equal-to-called-once': require('.'),
});

test('plugin-tape: convert-equal-to-called-once: report', (t) => {
    t.report('equal', `Use 't.calledOnce(fn)' instead of 't.equal(fn.callCount, 1)'`);
    t.end();
});

test('plugin-tape: convert-equal-to-called-once: transform', (t) => {
    t.transform('equal');
    t.end();
});

