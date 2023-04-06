'use strict';

const {createTest} = require('@putout/test');
const removeUselessForOf = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['for-of/remove-useless', removeUselessForOf],
    ],
});

test('plugin-for-of: remove-useless: report', (t) => {
    t.report('empty', 'Avoid useless for-of');
    t.end();
});

test('plugin-for-of: remove-useless: transform', (t) => {
    t.transform('empty', '\n');
    t.end();
});

test('plugin-for-of: remove-useless: transform: one', (t) => {
    t.transform('one');
    t.end();
});

test('plugin-for-of: remove-useless: no transform: many', (t) => {
    t.noTransform('many');
    t.end();
});

test('plugin-for-of: remove-useless: no transform: not identifier', (t) => {
    t.noTransform('not-id');
    t.end();
});

test('plugin-for-of: remove-useless: no transform: refs', (t) => {
    t.noTransform('refs');
    t.end();
});

test('plugin-for-of: remove-useless: transform: no refs', (t) => {
    t.transform('no-refs');
    t.end();
});

test('plugin-for-of: remove-useless: transform: unused', (t) => {
    t.transform('unused');
    t.end();
});

