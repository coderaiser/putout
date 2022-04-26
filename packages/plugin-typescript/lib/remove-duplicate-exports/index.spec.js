'use strict';

const {createTest} = require('@putout/test');
const removeDuplicateExports = require('.');
const test = createTest(__dirname, {
    'remove-duplicate-exports': removeDuplicateExports,
});

test('remove duplicate-exports: report', (t) => {
    t.report('duplicate', 'Avoid duplicate exports');
    t.end();
});

test('remove duplicate-exports: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

