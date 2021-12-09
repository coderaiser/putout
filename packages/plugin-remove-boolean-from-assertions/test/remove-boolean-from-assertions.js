'use strict';

const removeBooleanFromAssertions = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-boolean-from-assertions': removeBooleanFromAssertions,
});

test('plugin-remove-boolean-from-assertions: report', (t) => {
    t.report('assertions', 'Avoid boolean in assertions');
    t.end();
});

test('plugin-remove-boolean-from-assertions: transform', (t) => {
    t.transform('assertions');
    t.end();
});

test('plugin-remove-boolean-from-assertions: no transform: not-equal-false', (t) => {
    t.noTransform('not-equal-false');
    t.end();
});

