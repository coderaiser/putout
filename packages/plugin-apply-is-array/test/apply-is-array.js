'use strict';

const test = require('@putout/test')(__dirname, {
    'apply-early-return': require('..'),
});

test('plugin-apply-early-return: transform: report', (t) => {
    t.report('instanceof', 'Use Array.isArray() instead of instanceof');
    t.end();
});

test('plugin-apply-early-return: transform: else', (t) => {
    t.transform('instanceof');
    t.end();
});

