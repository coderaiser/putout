'use strict';

const {createTest} = require('@putout/test');
const addReturnAwait = require('..');

const test = createTest(__dirname, {
    'add-return-await': addReturnAwait,
});

test('plugin-add-return-await: report', (t) => {
    t.report('return', '"return await promise()" should be used instead of "return promise()"');
    t.end();
});

test('plugin-add-return-await: transform', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-add-return-await: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-add-return-await: no transform: not async', (t) => {
    t.noTransform('not-async');
    t.end();
});

test('plugin-add-return-await: no transform: no ref', (t) => {
    t.noTransform('no-ref');
    t.end();
});

test('plugin-add-return-await: no transform: not promise', (t) => {
    t.noTransform('not-promise');
    t.end();
});

