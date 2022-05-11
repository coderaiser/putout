'use strict';

const {createTest} = require('@putout/test');
const addFixLint = require('.');

const test = createTest(__dirname, {
    'add-fix-lint': addFixLint,
});

test('madrun: add fix:lint: report', (t) => {
    t.report('lint', 'fix:lint should exist');
    t.end();
});

test('madrun: add fix:lint: transform: string', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: add fix:lint: no transform: exists', (t) => {
    t.noTransform('exists');
    t.end();
});

