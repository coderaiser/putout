'use strict';

const test = require('@putout/test')(__dirname, {
    montag: require('..'),
});

test('plugin-apply-montag: transform: report', (t) => {
    t.report('montag', `Apply 'montag' instead of [''].join()`);
    t.end();
});

test('plugin-apply-montag: transform: montag', (t) => {
    t.transform('montag');
    t.end();
});

test('plugin-apply-montag: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('plugin-apply-montag: transform: newline', (t) => {
    t.transform('newline');
    t.end();
});

test('plugin-apply-montag: no transform: not-str', (t) => {
    t.noTransform('not-str');
    t.end();
});

