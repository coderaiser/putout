'use strict';

const {createTest} = require('@putout/test');

const codemodMadrun = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['codemod-madrun', codemodMadrun],
    ],
});

test('codemod-madrun: transform', (t) => {
    t.transform('add-madrun-to-lint');
    t.end();
});

test('codemod-madrun: no transform: no module.exports', (t) => {
    t.noTransform('no-module-exports');
    t.end();
});

test('codemod-madrun: no transform: module.exports not object', (t) => {
    t.noTransform('module-exports-not-object');
    t.end();
});
