'use strict';

const eslint = require('..');

const test = require('@putout/test')(__dirname, {
    eslint,
});

test('putout: plugin-eslint: report: move-putout-to-end-in-extends', (t) => {
    t.report('json', '"putout" should be in the end of the "extends" list');
    t.end();
});

test('putout: plugin-eslint: transform: move-putout-to-end-in-extends', (t) => {
    t.transform('json');
    t.end();
});

test('putout: plugin-eslint: transform: convert-ide-to-safe', (t) => {
    t.transform('convert-ide-to-safe');
    t.end();
});

