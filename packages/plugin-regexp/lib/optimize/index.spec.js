'use strict';

const test = require('@putout/test')(__dirname, {
    'regexp/optimize': require('.'),
});

test('plugin-regexp/optimize: report', (t) => {
    t.report('regexp', 'RegExp /(ab|ab)/ can be optimized to /(ab)/');
    t.end();
});

test('plugin-regexp/optimize: transform', (t) => {
    t.transform('regexp');
    t.end();
});

