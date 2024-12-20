'use strict';

const {createTest} = require('@putout/test');
const convertRequireToImport = require('./index.js');

const test = createTest(__dirname, {
    'eslint/convert-require-to-import': convertRequireToImport,
});

test('putout: plugin-eslint: convert-require-to-import-in-extends: report', (t) => {
    t.report('convert-require-to-import', `Use 'import' in ESM`);
    t.end();
});

test('putout: plugin-eslint: convert-require-to-import-in-extends: no transform', (t) => {
    t.noTransform('convert-require-to-import');
    t.end();
});
