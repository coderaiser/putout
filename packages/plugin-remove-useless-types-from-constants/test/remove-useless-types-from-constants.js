'use strict';

const {createTest} = require('@putout/test');
const removeUselessTypesFromConstants = require('..');

const test = createTest(__dirname, {
    'remove-useless-types-from-constants': removeUselessTypesFromConstants,
});

test('plugin-remove-useless-types-from-constants: report', (t) => {
    t.report('any', 'Remove useless type when declaring constant with primitive value');
    t.end();
});

test('plugin-remove-useless-types-from-constants: transform: any', (t) => {
    t.transform('any');
    t.end();
});

test('plugin-remove-useless-types-from-constants: transform: let', (t) => {
    t.transform('let');
    t.end();
});

test('plugin-remove-useless-types-from-constants: no transform: union', (t) => {
    t.noTransform('union');
    t.end();
});

test('plugin-remove-useless-types-from-constants: no report', (t) => {
    t.noReport('no-type');
    t.end();
});

