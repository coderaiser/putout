import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-commonjs-to-esm/commons', convert],
    ],
});

test('plugin-convert-commonjs-to-esm: commons: report', (t) => {
    t.report('commons', `Declare '__filename', '__dirname' and 'require' in ESM`);
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: transform', (t) => {
    t.transform('commons');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: transform: require', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: transform: top-level-require', (t) => {
    t.transform('top-level-require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: no transform: declared-require', (t) => {
    t.noTransform('declared-require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: no transform', (t) => {
    t.noTransformCode('const a = 5;\n');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: no report: object', (t) => {
    t.noReport('object');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: no report: member', (t) => {
    t.noReport('member');
    t.end();
});
