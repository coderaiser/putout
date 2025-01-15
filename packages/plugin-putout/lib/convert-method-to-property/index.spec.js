'use strict';

const {createTest} = require('@putout/test');
const convertMethodToProperty = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/convert-method-to-property', convertMethodToProperty],
    ],
});

test('plugin-putout: convert-method-to-property: report: match', (t) => {
    t.report('match', 'Object Property should be used instead of Method');
    t.end();
});

test('plugin-putout: convert-method-to-property: transform: match', (t) => {
    t.transform('match');
    t.end();
});

test('plugin-putout: convert-method-to-property: transform: replace', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-putout: convert-method-to-property: no transform: no-args', (t) => {
    t.noTransform('no-args');
    t.end();
});
