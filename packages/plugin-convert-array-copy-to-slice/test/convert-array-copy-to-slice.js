'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-array-copy-to-slice': require('..'),
});

test('plugin-convert-array-copy-to-slice: report', (t) => {
    t.report('spread', 'Array should be copied using slice');
    t.end();
});

test('plugin-convert-array-copy-to-slice: transform', (t) => {
    t.transform('spread');
    t.end();
});

test('plugin-convert-array-copy-to-slice: no transform: elements', (t) => {
    t.noTransform('elements');
    t.end();
});

