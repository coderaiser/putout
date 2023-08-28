import {createTest} from '@putout/test';
import * as applyReplaceAll from '../lib/apply-replace-all.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['apply-replace-all', applyReplaceAll],
    ],
});

test('apply replace all: report', (t) => {
    t.report('replace', 'Replace regexp should be used instead of string');
    t.end();
});

test('apply replace all: transform: replace', (t) => {
    t.transform('replace');
    t.end();
});

test('apply replace all: no transform: regexp', (t) => {
    t.noTransform('regexp');
    t.end();
});
