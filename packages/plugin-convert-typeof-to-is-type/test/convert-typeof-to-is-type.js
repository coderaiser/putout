'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-typeof-to-is-type': require('..'),
});

test('plugin-convert-typeof-to-is-type: report', (t) => {
    t.report('typeof', `Use function to check type instead of 'typeof'`);
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform', (t) => {
    t.transform('typeof');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: fn', (t) => {
    t.noTransform('fn');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: declaration', (t) => {
    t.noTransform('declaration');
    t.end();
});

test('plugin-convert-typeof-to-is-type: transform: bind', (t) => {
    t.noTransform('bind');
    t.end();
});

