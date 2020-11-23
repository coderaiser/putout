'use strict';

const test = require('@putout/test')(__dirname, {
    regexp: require('..'),
});

test('plugin-regexp: optimize: report', (t) => {
    t.report('regexp', 'RegExp /(ab|ab)/ can be optimized to /(ab)/');
    t.end();
});

test('plugin-regexp: simplify: transform', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-regexp: convert-to-string: transform', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-regexp: convert-replace-to-replace-all: transform', (t) => {
    t.transform('replace-global');
    t.end();
});
