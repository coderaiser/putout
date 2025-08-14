import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-character-class', plugin],
    ],
});

test('regexp: apply-character-class: report', (t) => {
    t.report('apply-character-class', `Use character class instead of single character alternation: '/\\(|\\)|\\)/g' -> '/[()]|\\)/g'`);
    t.end();
});

test('regexp: apply-character-class: transform', (t) => {
    t.transform('apply-character-class');
    t.end();
});

test('regexp: apply-character-class: no report: not-escaped', (t) => {
    t.noReport('not-escaped');
    t.end();
});
