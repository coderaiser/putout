'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['create-app-directory', plugin],
    ],
});

test('packages: create-app-directory: report', (t) => {
    t.report('create-app-directory', `Rename 'README.md' to 'readme.md'`);
    t.end();
});

test('packages: create-app-directory: transform', (t) => {
    t.transform('create-app-directory');
    t.end();
});
