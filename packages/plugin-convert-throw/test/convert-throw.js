'use strict';

const {createTest} = require('@putout/test');
const convertThrow = require('..');

const test = createTest(__dirname, {
    'convert-throw': convertThrow,
});

test('plugin-convert-throw: report', (t) => {
    t.report('throw', '"throw" should be used without body');
    t.end();
});

test('plugin-convert-throw: transform', (t) => {
    t.transform('throw');
    t.end();
});
