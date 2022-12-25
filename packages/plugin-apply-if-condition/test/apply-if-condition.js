'use strict';

const {createTest} = require('@putout/test');
const applyIfCondition = require('..');

const test = createTest(__dirname, {
    'apply-if-condition': applyIfCondition,
});

test('plugin-apply-if-condition: report', (t) => {
    t.report('if', 'Avoid empty statement in if condition');
    t.end();
});

test('plugin-apply-if-condition: transform', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-apply-if-condition: no transform: empty', (t) => {
    t.noTransform('empty');
    t.end();
});
