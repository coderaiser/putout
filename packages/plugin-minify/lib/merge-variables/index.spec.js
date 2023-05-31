'use strict';

const {createTest} = require('@putout/test');
const removeUnreferencedVariables = require('@putout/plugin-remove-unreferenced-variables');

const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['merge-variables', plugin],
    ],
});

test('plugin-minify: merge-variables: report', (t) => {
    t.report('merge-variables', `Merge variables`);
    t.end();
});

test('plugin-minify: merge-variables: transform', (t) => {
    t.transform('merge-variables');
    t.end();
});

test('plugin-minify: merge-variables: transform: remove-unreferenced-variables', (t) => {
    t.transform('remove-unreferenced-variables', {
        'remove-unreferenced-variables': removeUnreferencedVariables,
    });
    t.end();
});
