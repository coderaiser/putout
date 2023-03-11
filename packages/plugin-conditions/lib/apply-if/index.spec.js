'use strict';

const {createTest} = require('@putout/test');
const applyIf = require('.');

const test = createTest(__dirname, {
    'conditions/apply-if-condition': applyIf,
});

test('plugin-conditions: apply-if: report', (t) => {
    t.report('if', 'Avoid empty statement in if condition');
    t.end();
});

test('plugin-conditions: apply-if: transform', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-conditions: apply-if: no transform: empty', (t) => {
    t.noTransform('empty');
    t.end();
});
