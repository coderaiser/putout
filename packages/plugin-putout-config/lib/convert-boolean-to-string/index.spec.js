'use strict';

const {createTest} = require('@putout/test');
const convertBooleanToString = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout-config/convert-boolean-to-string', convertBooleanToString],
    ],
});

test('plugin-putout-config: convert-boolean-to-string: report', (t) => {
    t.report('bool', `Use 'String (on/off)' instead of 'Boolean (true/false)'`);
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform: bool', (t) => {
    t.transform('bool');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform: bool: bool-first', (t) => {
    t.transform('bool-first');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform: match', (t) => {
    t.transform('match');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: no transform: tuple', (t) => {
    t.noTransform('tuple');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: no transform: options', (t) => {
    t.noTransform('options');
    t.end();
});
