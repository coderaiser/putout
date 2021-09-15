'use strict';

const test = require('@putout/test')(__dirname, {
    'codemod-madrun': require('..'),
});

test('codemod-madrun: transform', (t) => {
    t.transform('add-madrun-to-lint');
    t.end();
});

test('codemod-madrun: transform: no module.exports', (t) => {
    t.noTransform('no-module-exports');
    t.end();
});

test('codemod-madrun: no transform: module.exports not object', (t) => {
    t.noTransform('module-exports-not-object');
    t.end();
});
