'use strict';

const test = require('@putout/test')(__dirname, {
    'add-return-await': require('..'),
});

test('plugin-add-return-await: report', (t) => {
    t.report('return', '"return await promise()" should be used instead of "return promise()"');
    t.end();
});

test('plugin-add-return-await: transform', (t) => {
    t.transform('return');
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
