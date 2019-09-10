'use strict';

const test = require('@putout/test')(__dirname, {
    'cut-legacy': require('..'),
});

test('codemod-cut-legacy: report', (t) => {
    t.report('legacy', 'Suffix "legacy" should be avoided');
    t.end();
});

test('codemod-cut-legacy: transform', (t) => {
    t.transform('legacy');
    t.end();
});

test('codemod-cut-legacy: no transform: id', (t) => {
    t.noTransform('id');
    t.end();
});
