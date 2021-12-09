'use strict';

const removeUselessContinue = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-useless-continue': removeUselessContinue,
});

test('plugin-remove-useless-continue: report', (t) => {
    t.report('continue', 'Useless continue should be avoided');
    t.end();
});

test('plugin-remove-useless-continue: no report: if', (t) => {
    t.noReport('if');
    t.end();
});

test('plugin-remove-useless-continue: transform', (t) => {
    t.transform('continue');
    t.end();
});

test('plugin-remove-useless-continue: no transform: no-continue', (t) => {
    t.noTransform('no-continue');
    t.end();
});

