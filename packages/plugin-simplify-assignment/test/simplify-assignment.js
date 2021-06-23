'use strict';

const test = require('@putout/test')(__dirname, {
    'simplify-assignment': require('..'),
});

test('plugin-simplify-assignment: report', (t) => {
    t.report('assignment', 'Assignment should be simplified');
    t.end();
});

test('plugin-simplify-assignment: transform', (t) => {
    t.transform('assignment');
    t.end();
});

