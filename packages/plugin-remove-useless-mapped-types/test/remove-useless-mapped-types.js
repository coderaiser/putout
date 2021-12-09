'use strict';

const removeUselessMappedTypes = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-useless-mapped-types': removeUselessMappedTypes,
});

test('plugin-remove-useless-mapped-types: report', (t) => {
    t.report('mapped-types', 'Avoid useless mapped types');
    t.end();
});

test('plugin-remove-useless-mapped-types: transform', (t) => {
    t.transform('mapped-types');
    t.end();
});

