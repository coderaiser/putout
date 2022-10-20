'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'math/apply-multiplication': plugin,
});

test('plugin-math: apply-multiplication: report', (t) => {
    t.report('imul', `Use '*' instead of 'Math.imul()'`);
    t.end();
});

test('plugin-math: apply-multiplication: transform', (t) => {
    t.transform('imul');
    t.end();
});

