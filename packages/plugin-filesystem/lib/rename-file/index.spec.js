'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['rename-file', plugin],
    ],
});

test('packages: rename-file: report', (t) => {
    t.reportWithOptions('rename-file', `Rename 'README.md' to 'readme.md'`, {
        from: 'README.md',
        to: 'readme.md',
    });
    t.end();
});

test('packages: rename-file: no report: no-options', (t) => {
    t.noReport('no-options');
    t.end();
});

test('packages: rename-file: transform', (t) => {
    t.transformWithOptions('rename-file', {
        from: 'README.md',
        to: 'readme.md',
    });
    t.end();
});

test('packages: rename-file: transform: mask', (t) => {
    t.transformWithOptions('mask', {
        find: '*.test.*',
        from: 'test',
        to: 'spec',
    });
    t.end();
});
