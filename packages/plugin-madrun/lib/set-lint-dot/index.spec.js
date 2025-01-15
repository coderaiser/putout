'use strict';

const {createTest} = require('@putout/test');
const setLintDot = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['set-lint-dot', setLintDot],
    ],
});

test('madrun: set lint dot: report', (t) => {
    t.report('lint', `Use 'lint' to check current drectory`);
    t.end();
});

test('madrun: set lint dot: transform', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: set lint dot: transform: lint-template', (t) => {
    t.transform('lint-template');
    t.end();
});

test('madrun: set lint dot: transform: template: template-variables', (t) => {
    t.transform('template-variables');
    t.end();
});

test('madrun: set lint dot: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('madrun: set lint dot: no transform: lint-fn', (t) => {
    t.noTransform('lint-fn');
    t.end();
});

test('madrun: set lint dot: no transform: no-lint', (t) => {
    t.noTransform('no-lint');
    t.end();
});
