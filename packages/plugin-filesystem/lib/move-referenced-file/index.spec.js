'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['move-referenced-file', plugin],
    ],
});

test('packages: move-referenced-file: report', (t) => {
    t.reportWithOptions('move-referenced-file', `Move '/src/hello.js' to '/lib/hello.js'`, {
        name: '/src/hello.js',
        directory: 'lib',
    });
    t.end();
});

test('packages: move-referenced-file: transform: long path', (t) => {
    t.transformWithOptions('move-referenced-file', {
        name: '/src/hello.js',
        directory: 'lib',
    });
    t.end();
});

test('packages: move-referenced-file: transform', (t) => {
    t.noReportAfterTransformWithOptions('move-referenced-file', {
        name: 'hello.js',
        directory: 'lib',
    });
    t.end();
});

test('packages: move-referenced-file: no transform: no name', (t) => {
    t.noTransform('no-name');
    t.end();
});
