'use strict';

const test = require('@putout/test')(__dirname, {
    'madrun/rename-esilnt-to-putout': require('.'),
});

test('madrun: convert run argument: report', (t) => {
    t.report('eslint', `"putout" should be used instead of "eslint"`);
    t.end();
});

test('madrun: convert run argument: transform: eslint', (t) => {
    t.transform('eslint');
    t.end();
});

test('madrun: convert run argument: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('madrun: convert run argument: no transform: putout', (t) => {
    t.noTransform('eslint-fix');
    t.end();
});

