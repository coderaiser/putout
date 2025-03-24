'use strict';

const {createTest} = require('@putout/test');
const convertAssignmentToComparison = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['assignment/convert-to-comparison', convertAssignmentToComparison],
    ],
});

test('plugin-assignment: convert-to-comparison: report: assignment', (t) => {
    t.report('assignment', 'Expected comparison instead of assignment');
    t.end();
});

test('plugin-assignment: convert-to-comparison: transform: assignment', (t) => {
    t.transform('assignment');
    t.end();
});
