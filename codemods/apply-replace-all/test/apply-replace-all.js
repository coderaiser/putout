'use strict';

const test = require('@putout/test')(__dirname, {
    'apply-replace-all': require('..'),
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

