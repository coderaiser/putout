'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-short-processors', plugin],
    ],
});

test('packages: apply-short-processors: report', (t) => {
    t.report('apply-short-processors', `Use '[__ignore]' instead of '__putout_processor_ignore(__a)'`);
    t.end();
});

test('packages: apply-short-processors: report: json', (t) => {
    t.report('json', `Use '[__json]' instead of '__putout_processor_json(__a)'`);
    t.end();
});

test('packages: apply-short-processors: transform', (t) => {
    t.transform('apply-short-processors');
    t.end();
});
