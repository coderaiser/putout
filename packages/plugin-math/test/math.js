'use strict';

const {createTest} = require('@putout/test');
const math = require('..');

const test = createTest(__dirname, {
    math,
});

test('plugin-math: transform: convert-sqrt-to-hypot', (t) => {
    t.transform('convert-sqrt-to-hypot');
    t.end();
});

test('plugin-math: transform: apply-exponentiation', (t) => {
    t.transform('apply-exponentiation');
    t.end();
});
