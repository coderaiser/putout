'use strict';

const test = require('@putout/test')(__dirname, {
    'extract-object-properties': require('.'),
});

test('plugin-extract-object-properties: not-equal-deep: report', (t) => {
    t.report('object', 'Object properties should be extracted into variables');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: var exists', (t) => {
    t.noTransform('var-exists');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: not destructuring', (t) => {
    t.noTransform('not-destr');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: var exists', (t) => {
    t.noTransform('var-exists');
    t.end();
});
