'use strict';

const {createTest} = require('@putout/test');
const optimize = require('.');

const test = createTest(__dirname, {
    'regexp/optimize': optimize,
});

test('plugin-regexp/optimize: report', (t) => {
    t.report('regexp', 'RegExp /(ab|ab)/ can be optimized to /(ab)/');
    t.end();
});

test('plugin-regexp/optimize: transform', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-regexp/optimize: no transform: same-length', (t) => {
    t.noTransform('same-length');
    t.end();
});

test('plugin-regexp/optimize: transform: crash', (t) => {
    t.noTransform('crash');
    t.end();
});

test('plugin-regexp/optimize: transform: flags', (t) => {
    t.transform('flags');
    t.end();
});

test('plugin-regexp/optimize: escapes', (t) => {
    t.noTransform('escape');
    t.end();
});

test('plugin-regexp/optimize: false positive after fix', (t) => {
    t.noReportAfterTransform('after-fix');
    t.end();
});

