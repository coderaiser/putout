import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-newline-before-text', plugin],
    ],
});

test('montag: add-newline-before-text: report', (t) => {
    t.report('add-newline-before-text', `Add '\\n' after montag`);
    t.end();
});

test('montag: add-newline-before-text: transform', (t) => {
    t.transform('add-newline-before-text');
    t.end();
});

test('montag: add-newline-before-text: no report: space', (t) => {
    t.noReport('space');
    t.end();
});

test('montag: add-newline-before-text: transform: indent', (t) => {
    t.transform('indent');
    t.end();
});
