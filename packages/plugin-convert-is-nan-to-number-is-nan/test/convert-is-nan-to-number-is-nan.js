'use strict';

const {createTest} = require('@putout/test');
const convertIsNanToNumberIsNan = require('..');

const test = createTest(__dirname, {
    'convert-is-nan-to-number-is-nan': convertIsNanToNumberIsNan,
});

test('plugin-convert-is-nan-to-number-is-nan: report', (t) => {
    t.report('is-nan', 'Number.isNaN should be used instead of isNaN');
    t.end();
});

test('plugin-convert-is-nan-to-number-is-nan: transform', (t) => {
    t.transform('is-nan');
    t.end();
});

test('plugin-convert-is-nan-to-number-is-nan: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

