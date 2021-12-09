'use strict';

const {declare} = require('@putout/plugin-tape').rules;

const mergeDebugger = require('..');
const test = require('@putout/test')(__dirname, {
    'merge-duplicate-imports': mergeDebugger,
});

test('merge duplicate imports: report', (t) => {
    t.report('duplicate', 'Avoid duplicate imports');
    t.end();
});

test('merge duplicate imports: transform', (t) => {
    t.transform('duplicate');
    t.end();
});

test('merge duplicate imports: transform: tape: declare', (t) => {
    t.transform('tape', {
        'tape/declare': declare,
    });
    t.end();
});

test('merge duplicate imports: transform: a couple defaultImportSpecifiers', (t) => {
    t.noTransform('couple-defaults');
    t.end();
});

test('merge duplicate imports: transform: namespace', (t) => {
    t.noTransform('namespace');
    t.end();
});

test('merge duplicate imports: transform: import-type', (t) => {
    t.transform('import-type');
    t.end();
});

