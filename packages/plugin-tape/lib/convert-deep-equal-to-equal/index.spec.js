'use strict';

const convertDeepEqualToEqual = require('.');

const test = require('@putout/test')(__dirname, {
    'tape/convert-deep-equal-to-equal': convertDeepEqualToEqual,
});

test('plugin-tape: convert-deep-equal-to-equal: report', (t) => {
    t.report('deep-equal', `Use 't.equal(x, 5)' instead of 't.deepEqual(x, 5)' when comparing with primitive`);
    t.end();
});

test('plugin-tape: convert-deep-equal-to-equal: transform', (t) => {
    t.transform('deep-equal');
    t.end();
});

test('plugin-tape: convert-deep-equal-to-equal: no transform: regexp', (t) => {
    t.noTransform('regexp');
    t.end();
});

