'use strict';

const simplifyAssignment = require('..');

const test = require('@putout/test')(__dirname, {
    'simplify-assignment': simplifyAssignment,
});

test('plugin-simplify-assignment: report', (t) => {
    t.report('assignment', 'Assignment should be simplified');
    t.end();
});

test('plugin-simplify-assignment: transform', (t) => {
    t.transform('assignment');
    t.end();
});

