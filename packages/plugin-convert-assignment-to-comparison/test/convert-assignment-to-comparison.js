'use strict';

const {createTest} = require('@putout/test');
const convertAssignmentToComparison = require('..');

const test = createTest(__dirname, {
    'convert-assignment-to-comparison': convertAssignmentToComparison,
});

test('plugin-convert-assignment-to-comparison: report', (t) => {
    t.report('assignment', 'Expected comparison instead of assignment');
    t.end();
});

test('plugin-convert-assignment-to-comparison: transform', (t) => {
    t.transform('assignment');
    t.end();
});

