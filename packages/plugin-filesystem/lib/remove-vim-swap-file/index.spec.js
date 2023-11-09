'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-vim-swap-file', plugin],
    ],
});

test('packages: remove-vim-swap-file: report', (t) => {
    t.report('remove-vim-swap-file', `Remove vim swap file`);
    t.end();
});

test('packages: remove-vim-swap-file: transform', (t) => {
    t.transform('remove-vim-swap-file');
    t.end();
});
