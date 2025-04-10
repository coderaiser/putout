import {createTest} from '@putout/test';
import * as types from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['types', types],
    ],
});

test('putout: plugin: types: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});

test('putout: plugin: types: declare: transform: convert-typeof-to-is-type', (t) => {
    t.transform('convert-typeof-to-is-type');
    t.end();
});

test('putout: plugin: types: declare: transform: remove-useless-conversion', (t) => {
    t.transform('remove-useless-conversion');
    t.end();
});

test('putout: plugin: types: declare: transform: remove-double-negations', (t) => {
    t.transform('remove-double-negations');
    t.end();
});

test('putout: plugin: types: declare: transform: remove-useless-typeof', (t) => {
    t.transform('remove-useless-typeof');
    t.end();
});

test('putout: plugin: types: declare: transform: apply-is-array', (t) => {
    t.transform('apply-is-array');
    t.end();
});

test('putout: plugin: types: transform: comment', (t) => {
    t.transform('comment');
    t.end();
});
