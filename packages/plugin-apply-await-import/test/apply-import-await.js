'use strict';

const {createTest} = require('@putout/test');
const awaitImport = require('..');

const test = createTest(__dirname, {
    'await-import': awaitImport,
});

test('plugin-apply-await-import: transform: report', (t) => {
    t.report('await-import', `Use 'await' near 'import' call`);
    t.end();
});

test('plugin-apply-await-import: transform: await-import', (t) => {
    t.transform('await-import');
    t.end();
});

test('plugin-apply-await-import: transform: not-declaration', (t) => {
    t.noTransform('not-declaration');
    t.end();
});

