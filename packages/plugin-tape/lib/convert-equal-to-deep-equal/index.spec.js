'use strict';

const {createTest} = require('@putout/test');
const convertEqualToOk = require('.');

const test = createTest(__dirname, {
    'tape/convert-equal-to-deep-equal': convertEqualToOk,
});

test('plugin-tape: convert-equal-to-deep-equal: report', (t) => {
    t.report('equal', `Use 't.deepEqual()' when comparing Objects an Arrays`);
    t.end();
});

test('plugin-tape: convert-equal-to-deep-equal: transform', (t) => {
    t.transform('equal');
    t.end();
});

