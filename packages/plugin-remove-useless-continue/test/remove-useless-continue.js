'use strict';

const {createTest} = require('@putout/test');
const removeUselessContinue = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-continue', removeUselessContinue],
    ],
});

test('plugin-remove-useless-continue: report: continue', (t) => {
    t.report('continue', `Avoid useless 'continue'`);
    t.end();
});

test('plugin-remove-useless-continue: no report: if', (t) => {
    t.noReport('if');
    t.end();
});

test('plugin-remove-useless-continue: transform: continue', (t) => {
    t.transform('continue');
    t.end();
});

test('plugin-remove-useless-continue: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-remove-useless-continue: no transform: no-continue', (t) => {
    t.noTransform('no-continue');
    t.end();
});
