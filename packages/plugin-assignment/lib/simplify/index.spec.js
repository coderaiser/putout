'use strict';

const {createTest} = require('@putout/test');
const simplify = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['assignment/simplify', simplify],
    ],
});

test('plugin-assignment: simplify: report: assignment', (t) => {
    t.report('assignment', 'Simplify assignment');
    t.end();
});

test('plugin-assignment: simplify: transform: assignment', (t) => {
    t.transform('assignment');
    t.end();
});

test('plugin-assignment: simplify: no transform: declaration', (t) => {
    t.noTransform('declaration');
    t.end();
});

test('plugin-assignment: simplify: no transform: iife', (t) => {
    t.noTransform('iife');
    t.end();
});
