'use strict';

const {createTest} = require('@putout/test');
const convertMathPow = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['math/convert-sqrt-to-hypot', convertMathPow],
    ],
});

test('plugin-math: convert-sqrt-to-hypot: report: sqrt', (t) => {
    t.report('sqrt', `Use 'Math.hypot()' instead of 'Math.sqrt()'`);
    t.end();
});

test('plugin-math: convert-sqrt-to-hypot: transform: sqrt', (t) => {
    t.transform('sqrt');
    t.end();
});
