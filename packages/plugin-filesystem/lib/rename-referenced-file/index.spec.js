'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['rename-referenced-file', plugin],
    ],
});

test('packages: rename-referenced-file: report', (t) => {
    t.report('rename-referenced-file', `Rename 'hello.js' to 'world.js'`);
    t.end();
});

test('packages: rename-referenced-file: transform', (t) => {
    t.transform('rename-referenced-file');
    t.end();
});
