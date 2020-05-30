'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-equal-to-strict-equal': require('..'),
});

test('plugin-convert-equal-to-strict-equal: report', (t) => {
    t.report('equal', 'Strict equal should be used instead of equal');
    t.end();
});

test('plugin-convert-equal-to-strict-equal: transform', (t) => {
    t.transform('equal');
    t.end();
});

