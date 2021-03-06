'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-mock-require-to-mock-import': require('..'),
});

test('plugin-convert-mock-require-to-mock-import: report', (t) => {
    t.report('mock-require', '"mockImport" should be used instead of "mockRequire"');
    t.end();
});

test('plugin-convert-mock-require-to-mock-import: transform', (t) => {
    t.transform('mock-require');
    t.end();
});

