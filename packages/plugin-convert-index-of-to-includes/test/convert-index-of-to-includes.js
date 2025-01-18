'use strict';

const {createTest} = require('@putout/test');
const convertIndexOfToIncludes = require('..');

const test = createTest(__dirname, {
    'convert-index-of-to-includes': convertIndexOfToIncludes,
});

test('plugin-convert-index-of-to-includes: report: index-of', (t) => {
    t.report('index-of', `Use 'includes()' instead of 'indexOf()'`);
    t.end();
});

test('plugin-convert-index-of-to-includes: transform: index-of', (t) => {
    t.transform('index-of');
    t.end();
});

test('plugin-convert-index-of-to-includes: transform: equal', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-convert-index-of-to-includes: transform: not-equal', (t) => {
    t.transform('not-equal');
    t.end();
});
