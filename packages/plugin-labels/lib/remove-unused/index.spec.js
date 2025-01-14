'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-unused', plugin],
    ],
});

test('putout: remove-unused: report', (t) => {
    t.report('remove-unused', `Label 'LABEL1' is defined but never used`);
    t.end();
});

test('putout: remove-unused: transform', (t) => {
    t.transform('remove-unused');
    t.end();
});

test('putout: remove-unused: transform: wrong', (t) => {
    t.transform('wrong');
    t.end();
});

test('putout: remove-unused: no report: return', (t) => {
    t.noReport('return');
    t.end();
});
