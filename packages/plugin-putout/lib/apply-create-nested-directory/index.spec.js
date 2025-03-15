'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-create-nested-directory', plugin],
    ],
});

test('putout: apply-create-nested-directory: report', (t) => {
    t.report('apply-create-nested-directory', `Use 'createNestedDirectory()' instead of 'createDirectory()'`);
    t.end();
});

test('putout: apply-create-nested-directory: transform', (t) => {
    t.transform('apply-create-nested-directory');
    t.end();
});

test('putout: apply-create-nested-directory: no report: not-string', (t) => {
    t.noReport('not-string');
    t.end();
});
