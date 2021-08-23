'use strict';

const test = require('@putout/test')(__dirname, {
    'regexp/remove-useless-group': require('.'),
});

test('plugin-regexp/remove-useless-group: report', (t) => {
    t.report('regexp', `Remove useless group from RegExp /(ab)/, use /ab/`);
    t.end();
});

test('plugin-regexp/remove-useless-group: transform', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: disjunction', (t) => {
    t.noTransform('disjunction');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: repetition', (t) => {
    t.noTransform('repetition');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: two groups', (t) => {
    t.noTransform('two-groups');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: tag', (t) => {
    t.noTransform('tag');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: split', (t) => {
    t.noTransform('split');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: replace', (t) => {
    t.noTransform('replace');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: first-group', (t) => {
    t.noTransform('first-group');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: named group', (t) => {
    t.noTransform('named-group');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: empty non capturing group', (t) => {
    t.noTransform('empty-non-capturing-group');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: variable', (t) => {
    t.noTransform('variable');
    t.end();
});
test('plugin-regexp/remove-useless-group: no transform: exec', (t) => {
    t.noTransform('exec');
    t.end();
});
