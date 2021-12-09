'use strict';

const convertOkToCalledWith = require('.');

const test = require('@putout/test')(__dirname, {
    'tape/convert-ok-to-called-with': convertOkToCalledWith,
});

test('plugin-tape: convert-ok-to-called-with: report', (t) => {
    t.report('ok', `Use 't.calledWith()' instead of 't.ok()'`);
    t.end();
});

test('plugin-tape: convert-ok-to-called-with: transform', (t) => {
    t.transform('ok');
    t.end();
});

