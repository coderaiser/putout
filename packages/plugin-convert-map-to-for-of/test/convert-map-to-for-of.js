'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-map-to-for-of': require('..'),
});

test('plugin-convert-map-to-for-of: report', (t) => {
    t.report('map', 'Use "for-of" instead of map when "return" absent');
    t.end();
});

test('plugin-convert-map-to-for-of: transform', (t) => {
    t.transform('map');
    t.end();
});

test('plugin-convert-map-to-for-of: transform: not-identifier', (t) => {
    t.transform('not-identifier');
    t.end();
});

test('plugin-convert-map-to-for-of: no transform: try', (t) => {
    t.noTransform('try');
    t.end();
});

