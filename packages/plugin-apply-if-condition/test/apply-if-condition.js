'use strict';

const applyIfCondition = require('..');

const test = require('@putout/test')(__dirname, {
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

