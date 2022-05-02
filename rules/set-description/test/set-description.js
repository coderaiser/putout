'use strict';

const {createTest} = require('@putout/test');
const setHomepage = require('..');
const test = createTest(__dirname, {
    'set-description': setHomepage,
});

test('rules: set-description: report', (t) => {
    t.report('description', 'Set 🐊 in description');
    t.end();
});

test('rules: set-description: transform', (t) => {
    t.transform('description');
    t.end();
});

test('rules: set-description: no report', (t) => {
    t.noReport('no-description');
    t.end();
});

