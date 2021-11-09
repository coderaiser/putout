'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/add-mock-import': require('.'),
});

test('plugin-tape: add-mock-import: report', (t) => {
    t.report('mock-import', `Call 'stopAll()' at the end of test when 'mockImport()' used`);
    t.end();
});

test('plugin-tape: add-mock-import: transform', (t) => {
    t.transform('mock-import');
    t.end();
});

test('plugin-tape: add-mock-import: no transform: no assertions', (t) => {
    t.noTransform('no-assertions');
    t.end();
});

test('plugin-tape: add-mock-import: no transform: no mock-import', (t) => {
    t.noTransform('no-mock-import');
    t.end();
});

test('plugin-tape: add-mock-import: transform: many-assertions', (t) => {
    t.transform('many-assertions');
    t.end();
});

test('plugin-tape: add-mock-import: transform: async', (t) => {
    t.transform('async');
    t.end();
});

