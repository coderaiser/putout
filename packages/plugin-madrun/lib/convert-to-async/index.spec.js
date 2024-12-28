'use strict';

const {createTest} = require('@putout/test');
const convertToAsync = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-to-async', convertToAsync],
    ],
});

test('madrun: convert to async: report', (t) => {
    t.report('run', 'Use async function');
    t.end();
});

test('madrun: convert to async: transform', (t) => {
    t.transform('run');
    t.end();
});

test('madrun: convert to async: transform: two', (t) => {
    t.transform('two');
    t.end();
});

test('madrun: convert to async: no transform: three', (t) => {
    t.noTransform('three');
    t.end();
});

test('madrun: convert to async: transform: three: arrow', (t) => {
    t.transform('three-arrow');
    t.end();
});

test('madrun: convert to async: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('madrun: convert to async: not transform: await', (t) => {
    t.noTransform('await');
    t.end();
});

test('madrun: convert to async: not transform: call', (t) => {
    t.noTransform('call');
    t.end();
});
