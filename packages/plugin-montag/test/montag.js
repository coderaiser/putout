import {createTest} from '@putout/test';
import * as montag from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['montag', montag],
    ],
});

test('plugin-apply-montag: report: montag', (t) => {
    t.report('montag', `Apply 'montag' instead of [''].join()`);
    t.end();
});

test('plugin-apply-montag: transform: montag', (t) => {
    t.transform('montag');
    t.end();
});

test('plugin-apply-montag: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('plugin-apply-montag: transform: newline', (t) => {
    t.transform('newline');
    t.end();
});

test('plugin-apply-montag: no transform: not-str', (t) => {
    t.noTransform('not-str');
    t.end();
});

test('plugin-apply-montag: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});
