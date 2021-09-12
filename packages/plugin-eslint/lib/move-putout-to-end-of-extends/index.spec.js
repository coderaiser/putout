'use strict';

const test = require('@putout/test')(__dirname, {
    'eslint/move-putout-to-end-of-extends': require('.'),
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: report', (t) => {
    t.report('json', '"putout" should be in the end of the "extends" list');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: transform', (t) => {
    t.transform('json');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: no transform: no extends', (t) => {
    t.noTransform('no-extends');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: no report: only', (t) => {
    t.noReport('only');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: no transform: only', (t) => {
    t.noTransform('only');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: no transform: extends-not-array', (t) => {
    t.noTransform('extends-not-array');
    t.end();
});

