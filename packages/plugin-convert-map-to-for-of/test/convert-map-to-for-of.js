'use strict';

const {createTest} = require('@putout/test');
const convertMapToForOf = require('..');

const test = createTest(__dirname, {
    'convert-map-to-for-of': convertMapToForOf,
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

