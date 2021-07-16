'use strict';

const test = require('@putout/test')(__dirname, {
    jest: require('..'),
});

test('plugin-jest: report', (t) => {
    t.report('jest', 'Latest Jest API should be used');
    t.end();
});

test('plugin-jest: transform', (t) => {
    t.transform('jest');
    t.end();
});

