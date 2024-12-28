'use strict';

const {createTest} = require('@putout/test');
const removeDebugger = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-duplicate-case', removeDebugger],
    ],
});

test('remove duplicate-case: report', (t) => {
    t.report('case', `Avoid duplicate 'case'`);
    t.end();
});

test('remove duplicate-case: transform: duplicate', (t) => {
    t.transform('case');
    t.end();
});

test('remove duplicate-case: no transform: no-duplicate', (t) => {
    t.noTransform('no-duplicate');
    t.end();
});
