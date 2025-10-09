import {createTest} from '@putout/test';
import * as convertObjectAssignToMergeSpread from '../lib/convert-object-assign-to-merge-spread.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-object-assign-to-merge-spread', convertObjectAssignToMergeSpread],
    ],
});

test('plugin-convert-object-assign-to-merge-spread: report: object', (t) => {
    t.report('object', `Use merge spread instead of 'Object.assign()'`);
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: transform: create', (t) => {
    t.transform('create');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: no transform: call', (t) => {
    t.noTransform('call');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: no transform: first', (t) => {
    t.noTransform('first');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('plugin-convert-object-assign-to-merge-spread: no transform: empty', (t) => {
    t.noTransform('empty');
    t.end();
});
