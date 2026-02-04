import {createTest} from '@putout/test';
import * as removeUselessMap from '../lib/remove-useless-map.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-map', removeUselessMap],
    ],
});

test('plugin-remove-useless-map: report: map', (t) => {
    t.report('map', 'Avoid useless map');
    t.end();
});

test('plugin-remove-useless-map: transform: map', (t) => {
    t.transform('map');
    t.end();
});

test('plugin-remove-useless-map: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-remove-useless-map: transform: entries', (t) => {
    t.transform('entries');
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

test('plugin-remove-useless-map: no transform: not-identifier: not-identifier-argument', (t) => {
    t.noTransform('not-identifier-argument');
    t.end();
});

test('plugin-remove-useless-map: no transform: bindings', (t) => {
    t.noTransform('bindings');
    t.end();
});
