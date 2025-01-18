'use strict';

const {createTest} = require('@putout/test');
const applyIf = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['conditions/apply-if-condition', applyIf],
    ],
});

test('plugin-conditions: apply-if: report: if', (t) => {
    t.report('if', 'Avoid empty statement in if condition');
    t.end();
});

test('plugin-conditions: apply-if: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-conditions: apply-if: no transform: empty', (t) => {
    t.noTransform('empty');
    t.end();
});
