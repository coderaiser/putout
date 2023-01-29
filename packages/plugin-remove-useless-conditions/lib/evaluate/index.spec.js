'use strict';

const {createTest} = require('@putout/test');
const removeUselessConditions = require('.');

const test = createTest(__dirname, {
    'remove-useless-conditions/evaluate': removeUselessConditions,
});

test('plugin-remove-useless-conditions: evaluate: report', (t) => {
    t.report('evaluate', 'Avoid useless conditions');
    t.end();
});

test('plugin-remove-useless-conditions: evaluate: transform: evaluate ', (t) => {
    t.transform('evaluate');
    t.end();
});

test('plugin-remove-useless-conditions: evaluate: transform: false', (t) => {
    t.transform('false');
    t.end();
});
