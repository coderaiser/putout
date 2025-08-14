import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-character-class', plugin],
    ],
});

test('regexp: apply-character-class: report', (t) => {
    t.report('apply-character-class', `Use character class instead of single character alternation: '/a|b/g' -> '/[ab]/g'`);
    t.end();
});

test('regexp: apply-character-class: transform', (t) => {
    t.transform('apply-character-class');
    t.end();
});
