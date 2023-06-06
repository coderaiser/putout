'use strict';

const {createTest} = require('@putout/test');

const cutLegacy = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['cut-legacy', cutLegacy],
    ],
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
