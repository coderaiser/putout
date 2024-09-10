'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-empty-file', plugin],
    ],
});

test('putout-config: remove-empty-file: report', (t) => {
    t.report('remove-empty-file', `Remove empty '.putout.json'`);
    t.end();
});

test('putout-config: remove-empty-file: transform', (t) => {
    t.transform('remove-empty-file');
    t.end();
});
