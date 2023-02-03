'use strict';

const {createTest} = require('@putout/test');
const removeUselessGroup = require('.');
const applyLiteralNotation = require('../apply-literal-notation');

const optimize = require('../optimize');

const test = createTest(__dirname, {
    'regexp/remove-useless-group': removeUselessGroup,
});

test('plugin-regexp/remove-useless-group: report', (t) => {
    t.report('regexp', `Remove useless group from RegExp /(ab)/, use /ab/`);
    t.end();
});

test('plugin-regexp/remove-useless-group: no report: decimal', (t) => {
    t.transform('decimal', {
        'regexp/optimize': optimize,
    });
    t.end();
});

test('plugin-regexp/remove-useless-group: transform', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: match', (t) => {
    t.noTransform('match');
    t.end();
});

test('plugin-regexp/remove-useless-group: transform: search', (t) => {
    t.transform('search');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: group alternatives', (t) => {
    t.transformCode('/^(babel)/.test(x)', '/^babel/.test(x)');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: group alternatives inside Repetition', (t) => {
    t.noTransformCode('/^(babel){1,}/.test(x)');
    t.end();
});

test('plugin-regexp/remove-useless-group: no transform: Alternative inside Assertion', (t) => {
    t.noTransformCode('/^(babel)\\1{1,}/.test(x)');
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

test('plugin-regexp/remove-useless-group: no transform: replaceAll', (t) => {
    t.noTransform('replace-all');
    t.end();
});

test('plugin-regexp/remove-useless-group: transform: apply-literal-notation', (t) => {
    t.transform('apply-literal-notation', {
        'regexp/apply-literal-notation': applyLiteralNotation,
    });
    t.end();
});

