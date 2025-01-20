'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['v3-apply-options-as-second-argument', plugin],
    ],
});

test('vitest: v3-apply-options-as-second-argument: report', (t) => {
    t.report('v3-apply-options-as-second-argument', `Pass 'options' in second argument`);
    t.end();
});

test('vitest: v3-apply-options-as-second-argument: transform', (t) => {
    t.transform('v3-apply-options-as-second-argument');
    t.end();
});
