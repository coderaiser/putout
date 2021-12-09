'use strict';

const convertMockRequireToMockImport = require('..');

const test = require('@putout/test')(__dirname, {
    'convert-mock-require-to-mock-import': convertMockRequireToMockImport,
});

test('plugin-convert-mock-require-to-mock-import: report', (t) => {
    t.report('mock-require', '"mockImport" should be used instead of "mockRequire"');
    t.end();
});

test('plugin-convert-mock-require-to-mock-import: transform', (t) => {
    t.transform('mock-require');
    t.end();
});

test('plugin-convert-mock-require-to-mock-import: transform: no-stop-all', (t) => {
    t.transform('no-stop-all');
    t.end();
});

