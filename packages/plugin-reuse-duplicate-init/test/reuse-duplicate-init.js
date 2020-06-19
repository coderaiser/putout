'use strict';

const test = require('@putout/test')(__dirname, {
    'reuse-duplicate-init': require('..'),
});

test('plugin-reuse-duplicate-init: report', (t) => {
    t.report('init', 'Duplicate init should be reused');
    t.end();
});

test('plugin-reuse-duplicate-init: transform', (t) => {
    t.transform('init');
    t.end();
});

test('plugin-reuse-duplicate-init: no transform: scope', (t) => {
    t.noTransform('scope');
    t.end();
});

test('plugin-reuse-duplicate-init: no transform: no main', (t) => {
    t.noTransform('no-main');
    t.end();
});

