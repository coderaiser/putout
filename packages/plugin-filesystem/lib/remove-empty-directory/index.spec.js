'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-empty-directory', plugin],
    ],
});

test('filesystem: remove-empty-directory: report', (t) => {
    t.report('remove-empty-directory', `Remove empty directory '/hello/abc/def'`);
    t.end();
});

test('filesystem: remove-empty-directory: transform', (t) => {
    t.transform('remove-empty-directory');
    t.end();
});
