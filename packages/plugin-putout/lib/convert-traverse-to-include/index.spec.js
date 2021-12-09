'use strict';

const convertTraverseToInclude = require('.');

const test = require('@putout/test')(__dirname, {
    'putout/convert-traverse-to-include': convertTraverseToInclude,
});

test('plugin-putout: convert-traverse-to-include: report', (t) => {
    t.report('traverse', 'Includer should be used instead of Traverser');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: transform', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: no transform: no method', (t) => {
    t.noTransform('no-method');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: no transform: no properties', (t) => {
    t.noTransform('no-properties');
    t.end();
});

