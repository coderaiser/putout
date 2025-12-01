import {createTest} from '@putout/test';
import * as convertObjectAssignToMergeSpread from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['spread/convert-object-assign-to-merge-spread', convertObjectAssignToMergeSpread],
    ],
});

test('plugin-spread: convert-object-assign-to-merge-spread: report: object', (t) => {
    t.report('convert-object-assign-to-merge-spread', `Use merge spread instead of 'Object.assign()'`);
    t.end();
});

test('plugin-spread: convert-object-assign-to-merge-spread: transform: object', (t) => {
    t.transform('convert-object-assign-to-merge-spread');
    t.end();
});

test('plugin-spread: convert-object-assign-to-merge-spread: transform: create', (t) => {
    t.transform('create');
    t.end();
});

test('plugin-spread: convert-object-assign-to-merge-spread: no transform: call', (t) => {
    t.noTransform('call');
    t.end();
});

test('plugin-spread: convert-object-assign-to-merge-spread: no transform: first', (t) => {
    t.noTransform('first');
    t.end();
});

test('plugin-spread: convert-object-assign-to-merge-spread: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('plugin-spread: convert-object-assign-to-merge-spread: no transform: empty', (t) => {
    t.noTransform('empty');
    t.end();
});
