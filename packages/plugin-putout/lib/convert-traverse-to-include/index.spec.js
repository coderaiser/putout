'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/convert-traverse-to-include': require('.'),
});

test('plugin-putout: convert-traverse-to-include: report', (t) => {
    t.report('traverse', 'Includer should be used instead of Traverser');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: transform', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: no transform: replaceWith exists', (t) => {
    t.noTransform('no-method');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: no transform: replaceWith exists', (t) => {
    t.noTransform('no-properties');
    t.end();
});

