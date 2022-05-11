'use strict';

const {createTest} = require('@putout/test');
const renameEsilntToPutout = require('.');

const test = createTest(__dirname, {
    'madrun/rename-esilnt-to-putout': renameEsilntToPutout,
});

test('madrun: rename-eslint-to-putout: report', (t) => {
    t.report('eslint', `"putout" should be used instead of "eslint"`);
    t.end();
});

test('madrun: rename-eslint-to-putout: transform: eslint', (t) => {
    t.transform('eslint');
    t.end();
});

test('madrun: rename-eslint-to-putout: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('madrun: rename-eslint-to-putout: no transform: eslintrc', (t) => {
    t.noTransform('eslintrc');
    t.end();
});

test('madrun: rename-eslint-to-putout: no transform: not lint', (t) => {
    t.noTransform('not-lint');
    t.end();
});

test('madrun: rename-eslint-to-putout: no transform: putout', (t) => {
    t.noTransform('eslint-fix');
    t.end();
});

test('madrun: rename-eslint-to-putout: no transform: not str', (t) => {
    t.noTransform('not-str');
    t.end();
});

