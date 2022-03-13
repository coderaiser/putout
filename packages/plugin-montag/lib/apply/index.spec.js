'use strict';

const {createTest} = require('@putout/test');
const montag = require('.');

const test = createTest(__dirname, {
    montag,
});

test('plugin-montag: apply: transform: report', (t) => {
    t.report('montag', `Apply 'montag' instead of [''].join()`);
    t.end();
});

test('plugin-montag: apply: transform: montag', (t) => {
    t.transform('montag');
    t.end();
});

test('plugin-montag: apply: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('plugin-montag: apply: transform: newline', (t) => {
    t.transform('newline');
    t.end();
});

test('plugin-montag: apply: no transform: not-str', (t) => {
    t.noTransform('not-str');
    t.end();
});

