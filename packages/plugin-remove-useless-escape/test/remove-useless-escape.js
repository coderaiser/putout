'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-escape': require('..'),
});

test('plugin-remove-useless-escape: report', (t) => {
    t.report('string', 'Unnecessary escape character');
    t.end();
});

test('plugin-remove-useless-escape: transform', (t) => {
    t.transform('string');
    t.end();
});

test('plugin-remove-useless-escape: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('plugin-remove-useless-escape: no transform: slash', (t) => {
    t.noTransform('slash');
    t.end();
});
