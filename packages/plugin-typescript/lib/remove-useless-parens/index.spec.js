'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'remove-useless-parens': plugin,
});

test('plugin-remove-useless-parens: report', (t) => {
    t.report('remove-useless-parens', 'Avoid useless parens');
    t.end();
});

test('plugin-remove-useless-parens: transform', (t) => {
    t.transform('remove-useless-parens');
    t.end();
});

test('plugin-remove-useless-parens: no transform: generic', (t) => {
    t.noTransform('generic');
    t.end();
});

