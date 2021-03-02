'use strict';

const test = require('@putout/test')(__dirname, {
    'add-async-to-function-with-await': require('..'),
});

test('plugin-add-async-to-function-with-await: report', (t) => {
    t.report('no-async', '"await" should be used in "async" function');
    t.end();
});

test('plugin-add-async-to-function-with-await: transform', (t) => {
    t.transform('no-async');
    t.end();
});

test('plugin-add-async-to-function-with-await: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-add-async-to-function-with-await: transform: top-level-await', (t) => {
    t.noTransform('top-level-await');
    t.end();
});
