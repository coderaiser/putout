'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-map': require('..'),
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

test('plugin-remove-useless-map: transform: not-identifier', (t) => {
    t.noTransform('not-identifier');
    t.end();
});

test('plugin-remove-useless-map: transform: not-identifier: argument', (t) => {
    t.noTransform('not-identifier-argument');
    t.end();
});

test('plugin-remove-useless-map: transform: bindings', (t) => {
    t.noTransform('bindings');
    t.end();
});

