'use strict';

const {createTest} = require('@putout/test');
const nextjs = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['nextjs', nextjs],
    ],
});

test('plugin-nextjs: transform: remove-a-from-link', (t) => {
    t.transform('remove-a-from-link');
    t.end();
});

test('plugin-nextjs: transform: convert-page-to-head', (t) => {
    t.transform('convert-page-to-head');
    t.end();
});

test('plugin-nextjs: transform: update-tsconfig-file', (t) => {
    t.transform('update-tsconfig-file');
    t.end();
});

test('plugin-nextjs: transform: update-tsconfig', (t) => {
    t.transform('update-tsconfig');
    t.end();
});
