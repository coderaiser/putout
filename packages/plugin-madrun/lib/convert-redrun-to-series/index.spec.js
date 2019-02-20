'use strict';

/* eslint node/no-unpublished-require:0 */
const addFunction= require('.');
const test = require('@putout/test')(__dirname, {
    'add-function': addFunction,
});

test('madrun: add function: report', (t) => {
    t.report('redrun', '"series" should be called instead of "redrun" in script: "lint"');
    t.end();
});

test('madrun: add function: transform: string', (t) => {
    t.transform('redrun');
    t.end();
});

