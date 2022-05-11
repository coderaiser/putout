'use strict';

const {createTest} = require('@putout/test');
const removeUselessMap = require('..');

const test = createTest(__dirname, {
    'remove-useless-map': removeUselessMap,
});

test('plugin-remove-useless-map: report', (t) => {
    t.report('map', 'Avoid useless map');
    t.end();
});

test('plugin-remove-useless-map: transform', (t) => {
    t.transform('map');
    t.end();
});

test('plugin-remove-useless-map: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-remove-useless-map: no transform: not-same', (t) => {
    t.noTransform('not-same');
    t.end();
});

test('plugin-remove-useless-map: no transform: not-identifier', (t) => {
    t.noTransform('not-identifier');
    t.end();
});

test('plugin-remove-useless-map: no transform: not-identifier: argument', (t) => {
    t.noTransform('not-identifier-argument');
    t.end();
});

test('plugin-remove-useless-map: no transform: bindings', (t) => {
    t.noTransform('bindings');
    t.end();
});

