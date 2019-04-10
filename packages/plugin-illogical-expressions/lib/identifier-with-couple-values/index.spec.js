'use strict';

const test = require('@putout/test')(__dirname, {
    'fix-illogical-expressions/couple-values': require('.'),
});

test('plugin-fix-illogical-expressions: couple-values: report', (t) => {
    t.report('couple-values', 'identifier checked for having a couple values in the same time');
    t.end();
});

test('plugin-fix-illogical-expressions: couple-values: transform', (t) => {
    t.transform('couple-values');
    t.end();
});

test('plugin-fix-illogical-expressions: couple-values: no transform: or', (t) => {
    t.noTransform('or');
    t.end();
});

test('plugin-fix-illogical-expressions: couple-values: no transform: more', (t) => {
    t.noTransform('more');
    t.end();
});

test('plugin-fix-illogical-expressions: couple-values: no transform: different identifiers', (t) => {
    t.noTransform('different-identifiers');
    t.end();
});

test('plugin-fix-illogical-expressions: couple-values: no transform: operators', (t) => {
    t.noTransform('different-operators');
    t.end();
});

test('plugin-fix-illogical-expressions: couple-values: no transform: not identifier', (t) => {
    t.noTransform('not-identifier');
    t.end();
});

