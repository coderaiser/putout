'use strict';

const {createTest} = require('@putout/test');

const madrunRenamePredefinedEslintToPutout = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['madrun/rename-predefined-eslint-to-putout', madrunRenamePredefinedEslintToPutout],
    ],
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
