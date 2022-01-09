'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    'nodejs/convert-dirname-to-url': convert,
});

test('nodejs: convert-dirname-to-url: report', (t) => {
    t.report('esm', `Use 'import.meta.url' instead of '__dirname'`);
    t.end();
});

test('nodejs: convert-dirname-to-url: transform', (t) => {
    t.transform('esm');
    t.end();
});

