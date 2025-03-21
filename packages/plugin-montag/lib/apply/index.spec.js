import {createTest} from '@putout/test';
import * as montag from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['montag', montag],
    ],
});

test('plugin-montag: apply: report: montag', (t) => {
    t.report('montag', `Apply 'montag' instead of [''].join()`);
    t.end();
});

test('plugin-montag: apply: transform: montag', (t) => {
    t.transform('montag');
    t.end();
});

test('plugin-montag: apply: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('plugin-montag: apply: transform: newline', (t) => {
    t.transform('newline');
    t.end();
});

test('plugin-montag: apply: no transform: not-str', (t) => {
    t.noTransform('not-str');
    t.end();
});
