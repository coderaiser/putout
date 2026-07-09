import {createTest} from '@putout/test';
import * as removeUselessMap from '@putout/plugin-remove-useless-map';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['for-of/map', plugin],
    ],
});

test('plugin-for-of: map: report', (t) => {
    t.report('map', `Use 'for...of' instead of map when 'return' absent`);
    t.end();
});

test('plugin-for-of: map: transform', (t) => {
    t.transform('map');
    t.end();
});

test('plugin-for-of: map: transform: not-identifier', (t) => {
    t.transform('not-identifier');
    t.end();
});

test('plugin-for-of: map: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('plugin-for-of: map: transform: remove-useless-map', (t) => {
    t.transform('remove-useless-map', {
        removeUselessMap,
    });
    t.end();
});

test('plugin-for-of: map: no transform: try', (t) => {
    t.noTransform('try');
    t.end();
});

test('plugin-for-of: map: transform: block', (t) => {
    t.transform('block');
    t.end();
});
