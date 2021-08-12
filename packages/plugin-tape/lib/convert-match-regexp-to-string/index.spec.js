'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/convert-match-regexp-to-string': require('.'),
});

test('plugin-tape: convert-match-regexp-to-string: report', (t) => {
    t.report('regexp', 't.match should be used with string pattern');
    t.end();
});

test('plugin-tape: convert-match-regexp-to-string: transform', (t) => {
    t.transform('regexp');
    t.end();
});

