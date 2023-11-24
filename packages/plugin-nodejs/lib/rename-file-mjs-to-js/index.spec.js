'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['rename-file-mjs-to-js', plugin],
    ],
});

test('packages: rename-file-mjs-to-js: report', (t) => {
    t.report('rename-file-mjs-to-js', `Rename '/lib/hello.mjs' to '/lib/hello.js'`);
    t.end();
});

test('packages: rename-file-mjs-to-js: transform', (t) => {
    t.transform('rename-file-mjs-to-js');
    t.end();
});
