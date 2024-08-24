'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-unused-labels', plugin],
    ],
});

test('putout: remove-unused-labels: report', (t) => {
    t.report('remove-unused-labels', `Label 'LABEL1' is defined but never used`);
    t.end();
});

test('putout: remove-unused-labels: transform', (t) => {
    t.transform('remove-unused-labels');
    t.end();
});

test('putout: remove-unused-labels: transform: wrong', (t) => {
    t.transform('wrong');
    t.end();
});
