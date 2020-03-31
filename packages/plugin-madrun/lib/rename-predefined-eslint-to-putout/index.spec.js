'use strict';

const test = require('@putout/test')(__dirname, {
    'madrun/rename-predefined-esilnt-to-putout': require('.'),
});

test('madrun: rename predefined: report', (t) => {
    t.report('eslint', `"putout" should be used instead of "eslint", when predefined`);
    t.end();
});

test('madrun: rename predefined: transform: eslint', (t) => {
    t.transform('eslint');
    t.end();
});

test('madrun: rename predefined: no transform: putout', (t) => {
    t.noTransform('putout');
    t.end();
});

test('madrun: rename predefined: no transform: putout', (t) => {
    t.noTransform('eslint-rulesdir');
    t.end();
});

