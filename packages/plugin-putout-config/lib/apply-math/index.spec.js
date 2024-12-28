'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-math', plugin],
    ],
});

test('putout-config: apply-math: report', (t) => {
    t.report('apply-math', `Rename property: 'convert-math-pow' -> 'math/apply-exponential'`);
    t.end();
});

test('putout-config: apply-math: transform', (t) => {
    t.transform('apply-math');
    t.end();
});
