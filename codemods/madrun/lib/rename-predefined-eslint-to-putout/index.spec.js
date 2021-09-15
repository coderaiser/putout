'use strict';

const test = require('@putout/test')(__dirname, {
    'madrun/rename-predefined-eslint-to-putout': require('.'),
});

test('madrun: rename-predefined-eslint-to-putout: report', (t) => {
    t.report('eslint', `"putout" should be used instead of "eslint", when predefined`);
    t.end();
});

test('madrun: rename-predefined-eslint-to-putout: transform: eslint', (t) => {
    t.transform('eslint');
    t.end();
});

test('madrun: rename-predefined-eslint-to-putout: no transform: putout', (t) => {
    t.noTransform('putout');
    t.end();
});

test('madrun: rename-predefined-eslint-to-putout: no transform: eslint-rulesdir', (t) => {
    t.noTransform('eslint-rulesdir');
    t.end();
});

