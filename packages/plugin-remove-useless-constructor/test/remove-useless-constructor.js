'use strict';

const removeUselessConstructor = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-useless-constructor': removeUselessConstructor,
});

test('plugin-remove-useless-constructor: report', (t) => {
    t.report('constructor', 'Avoid useless constructor');
    t.end();
});

test('plugin-remove-useless-constructor: transform', (t) => {
    t.transform('constructor');
    t.end();
});

test('plugin-remove-useless-constructor: no transform', (t) => {
    t.noTransform('not-string');
    t.end();
});

