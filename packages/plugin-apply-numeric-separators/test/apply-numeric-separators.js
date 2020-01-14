'use strict';

const test = require('@putout/test')(__dirname, {
    'apply-numeric-separators': require('..'),
});

test('plugin-apply-numeric-separators: transform: report', (t) => {
    t.report('number', 'Numeric separators should be used');
    t.end();
});

test('plugin-apply-numeric-separators: transform', (t) => {
    t.transform('number');
    t.end();
});

test('plugin-apply-numeric-separators: transform: sep', (t) => {
    t.noTransform('sep');
    t.end();
});
