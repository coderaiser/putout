import {createTest} from '@putout/test';
import * as convertMatchRegexpToString from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/convert-match-regexp-to-string', convertMatchRegexpToString],
    ],
});

test('plugin-tape: convert-match-regexp-to-string: report: regexp', (t) => {
    t.report('regexp', 't.match should be used with string pattern');
    t.end();
});

test('plugin-tape: convert-match-regexp-to-string: transform: regexp', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-tape: convert-match-regexp-to-string: transform: not-match', (t) => {
    t.transform('not-match');
    t.end();
});

test('plugin-tape: convert-match-regexp-to-string: no transform: not-simple', (t) => {
    t.noTransform('not-simple');
    t.end();
});
