'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-files', plugin],
    ],
});

test('packages: remove-files: no report: no options', (t) => {
    t.noReport('no-options');
    t.end();
});

test('packages: remove-files: report', (t) => {
    t.reportWithOptions('remove-files', `Remove file '*.swp': '/home/coderaiser/putout/lib/putout.js.swp'`, {
        names: ['*.swp'],
    });
    t.end();
});

test('packages: remove-files: transform', (t) => {
    t.transformWithOptions('remove-files', {
        names: ['*.swp'],
    });
    t.end();
});
