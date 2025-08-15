import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicates-from-character-class', plugin],
    ],
});

test('regexp: remove-duplicates-from-character-class: report', (t) => {
    t.report('remove-duplicates-from-character-class', `Remove duplicates from character class: '/[aaaaabb]/g' -> '/[ab]/g'`);
    t.end();
});

test('regexp: remove-duplicates-from-character-class: transform', (t) => {
    t.transform('remove-duplicates-from-character-class');
    t.end();
});

test('regexp: remove-duplicates-from-character-class: no report: class-range', (t) => {
    t.noReport('class-range');
    t.end();
});
