'use strict';

const {createTest} = require('@putout/test');
const convertAssignmentToComparison = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['convert-assignment-to-comparison', convertAssignmentToComparison],
    ],
});

test('plugin-convert-assignment-to-comparison: report: assignment', (t) => {
    t.report('assignment', 'Expected comparison instead of assignment');
    t.end();
});

test('plugin-convert-assignment-to-comparison: transform: assignment', (t) => {
    t.transform('assignment');
    t.end();
});
