'use strict';

const test = require('@putout/test')(__dirname, {
    montag: require('..'),
});

test('plugin-apply-destructuring: transform: report', (t) => {
    t.report('montag', `Apply 'montag' instead of [''].join()`);
    t.end();
});

test('plugin-apply-destructuring: transform: montag', (t) => {
    t.transform('montag');
    t.end();
});

test('plugin-apply-destructuring: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('plugin-apply-destructuring: no transform: not-str', (t) => {
    t.noTransform('not-str');
    t.end();
});

