'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-empty-array-from-process', plugin],
    ],
});

test('putout: remove-empty-array-from-process: report', (t) => {
    t.report('remove-empty-array-from-process', `Avoid empty array used as 'process()' argument`);
    t.end();
});

test('putout: remove-empty-array-from-process: transform', (t) => {
    t.transform('remove-empty-array-from-process');
    t.end();
});
