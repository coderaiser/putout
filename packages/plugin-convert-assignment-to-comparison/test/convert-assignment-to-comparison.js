'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-assignment-to-comparison': require('..'),
});

test('plugin-convert-assignment-to-comparison: report', (t) => {
    t.report('assignment', 'Expected comparison instead of assignment');
    t.end();
});

test('plugin-convert-assignment-to-comparison: transform', (t) => {
    t.transform('assignment');
    t.end();
});

