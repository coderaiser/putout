'use strict';

const {createTest} = require('@putout/test');
const evaluate = require('.');

const test = createTest(__dirname, {
    'conditions/evaluate': evaluate,
});

test('conditions: evaluate: report', (t) => {
    t.report('evaluate', 'Avoid useless conditions');
    t.end();
});

test('conditions: evaluate: transform: evaluate ', (t) => {
    t.transform('evaluate');
    t.end();
});

test('conditions: evaluate: transform: false', (t) => {
    t.transform('false');
    t.end();
});
