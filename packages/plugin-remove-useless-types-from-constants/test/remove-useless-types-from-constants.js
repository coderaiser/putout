'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-types-from-constants': require('..'),
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

