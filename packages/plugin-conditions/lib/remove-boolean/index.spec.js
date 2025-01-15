'use strict';

const {createTest} = require('@putout/test');
const removeBoolean = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['conditions/remove-boolean', removeBoolean],
    ],
});

test('plugin-conditions: remove-boolean: report: assertions', (t) => {
    t.report('assertions', 'Avoid boolean in assertions');
    t.end();
});

test('plugin-conditions: remove-boolean: transform: assertions', (t) => {
    t.transform('assertions');
    t.end();
});

test('plugin-conditions: remove-boolean: no transform: const', (t) => {
    t.noTransform('const');
    t.end();
});

test('plugin-conditions: remove-boolean: no transform: not-equal-false', (t) => {
    t.noTransform('not-equal-false');
    t.end();
});
