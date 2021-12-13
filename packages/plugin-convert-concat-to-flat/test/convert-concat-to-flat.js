'use strict';

const {createTest} = require('@putout/test');
const convertConcatToFlat = require('..');

const test = createTest(__dirname, {
    'convert-concat-to-flat': convertConcatToFlat,
});

test('plugin-convert-concat-to-flat: report', (t) => {
    t.report('concat', '"flat" should be used instead of "concat"');
    t.end();
});

test('plugin-convert-concat-to-flat: transform', (t) => {
    t.transform('concat');
    t.end();
});

