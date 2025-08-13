import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-global-regexp-to-replace-all', plugin],
    ],
});

test('regexp: apply-global-regexp-to-replace-all: report', (t) => {
    t.report('apply-global-regexp-to-replace-all', `Call 'replaceAll()' with global 'RegExp'`);
    t.end();
});

test('regexp: apply-global-regexp-to-replace-all: report: match-all', (t) => {
    t.report('match-all', `Call 'matchAll()' with global 'RegExp'`);
    t.end();
});

test('regexp: apply-global-regexp-to-replace-all: transform', (t) => {
    t.transform('apply-global-regexp-to-replace-all');
    t.end();
});

test('regexp: apply-global-regexp-to-replace-all: transform: match-all', (t) => {
    t.transform('match-all');
    t.end();
});
