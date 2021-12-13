'use strict';

const {createTest} = require('@putout/test');
const convertMatchRegexpToString = require('.');

const test = createTest(__dirname, {
    'tape/convert-match-regexp-to-string': convertMatchRegexpToString,
});

test('plugin-tape: convert-match-regexp-to-string: report', (t) => {
    t.report('regexp', 't.match should be used with string pattern');
    t.end();
});

test('plugin-tape: convert-match-regexp-to-string: transform', (t) => {
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

