'use strict';

const {createTest} = require('@putout/test');
const simplifyAssignment = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['simplify-assignment', simplifyAssignment],
    ],
});

test('plugin-simplify-assignment: report', (t) => {
    t.report('assignment', 'Simplify assignment');
    t.end();
});

test('plugin-simplify-assignment: transform', (t) => {
    t.transform('assignment');
    t.end();
});

test('plugin-simplify-assignment: no transform: declaration', (t) => {
    t.noTransform('declaration');
    t.end();
});

test('plugin-simplify-assignment: no transform: iife', (t) => {
    t.noTransform('iife');
    t.end();
});
