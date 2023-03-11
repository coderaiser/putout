'use strict';

const {createTest} = require('@putout/test');
const removeBoolean = require('.');

const test = createTest(__dirname, {
    'conditions/remove-boolean': removeBoolean,
});

test('plugin-conditions: remove-boolean: report', (t) => {
    t.report('assertions', 'Avoid boolean in assertions');
    t.end();
});

test('plugin-conditions: remove-boolean: transform', (t) => {
    t.transform('assertions');
    t.end();
});

test('plugin-conditions: remove-boolean: no transform: not-equal-false', (t) => {
    t.noTransform('not-equal-false');
    t.end();
});

