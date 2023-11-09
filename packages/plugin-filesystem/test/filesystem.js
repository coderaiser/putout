'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: no report: rename-file', (t) => {
    t.noReport('rename-file');
    t.end();
});

test('plugin-filesystem: transform: remove-vim-swap-file', (t) => {
    t.transform('remove-vim-swap-file');
    t.end();
});
