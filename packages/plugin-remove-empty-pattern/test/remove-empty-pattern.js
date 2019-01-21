'use strict';

const removeConsole = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-empty-pattern': removeConsole
});

test('plugin-remove-empty-pattern: report: object', (t) => {
    t.reportCode('const {} = obj', 'Empty object pattern');
    t.end();
});

test('plugin-remove-empty-pattern: report: array', (t) => {
    t.reportCode('const [] = array', 'Empty array pattern');
    t.end();
});

test('plugin-remove-empty-pattern: object', (t) => {
    t.transformCode('const {} = object', '');
    t.end();
});

test('plugin-remove-empty-pattern: array', (t) => {
    t.transformCode('const [] = array', '');
    t.end();
});

