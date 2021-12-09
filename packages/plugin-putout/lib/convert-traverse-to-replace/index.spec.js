'use strict';

const convertTraverseToReplace = require('.');

const test = require('@putout/test')(__dirname, {
    'putout/convert-traverse-to-replace': convertTraverseToReplace,
});

test('plugin-putout: convert-traverse-to-replace: report', (t) => {
    t.report('traverse', 'Replacer should be used instead of Traverser (https://git.io/JqcMn)');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: transform', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: no transform: with fix', (t) => {
    t.noTransform('with-fix');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: no transform: with push', (t) => {
    t.noTransform('with-push');
    t.end();
});

test('plugin-putout: convert-traverse-to-replace: transform: with options', (t) => {
    t.transform('with-options');
    t.end();
});

