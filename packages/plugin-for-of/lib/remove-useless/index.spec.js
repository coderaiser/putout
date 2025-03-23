import {createTest} from '@putout/test';
import * as removeUselessForOf from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['for-of/remove-useless', removeUselessForOf],
    ],
});

test('plugin-for-of: remove-useless: report: empty', (t) => {
    t.report('empty', 'Avoid useless for-of');
    t.end();
});

test('plugin-for-of: remove-useless: transform: empty', (t) => {
    t.transform('empty', '\n');
    t.end();
});

test('plugin-for-of: remove-useless: transform: one', (t) => {
    t.transform('one');
    t.end();
});

test('plugin-for-of: remove-useless: no transform: many', (t) => {
    t.noTransform('many');
    t.end();
});

test('plugin-for-of: remove-useless: no transform: not-id', (t) => {
    t.noTransform('not-id');
    t.end();
});

test('plugin-for-of: remove-useless: no transform: refs', (t) => {
    t.noTransform('refs');
    t.end();
});

test('plugin-for-of: remove-useless: transform: no-refs', (t) => {
    t.transform('no-refs');
    t.end();
});

test('plugin-for-of: remove-useless: transform: unused', (t) => {
    t.transform('unused');
    t.end();
});
