'use strict';

const {createTest} = require('@putout/test');
const convertEqualToCalledOnce = require('.');

const test = createTest(__dirname, {
    'tape/convert-equal-to-called-once': convertEqualToCalledOnce,
});

test('plugin-tape: convert-equal-to-called-once: report', (t) => {
    t.report('equal', `Use 't.calledOnce(fn)' instead of 't.equal(fn.callCount, 1)'`);
    t.end();
});

test('plugin-tape: convert-equal-to-called-once: transform', (t) => {
    t.transform('equal');
    t.end();
});

