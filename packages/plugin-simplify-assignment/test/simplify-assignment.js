'use strict';

const {createTest} = require('@putout/test');
const simplifyAssignment = require('..');

const test = createTest(__dirname, {
    'simplify-assignment': simplifyAssignment,
});

test('plugin-simplify-assignment: report', (t) => {
    t.report('assignment', 'Assignment should be simplified');
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

