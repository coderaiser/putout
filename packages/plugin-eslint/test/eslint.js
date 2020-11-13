'use strict';

const test = require('@putout/test')(__dirname, {
    eslint: require('..'),
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: report', (t) => {
    t.report('json', '"putout" should be in the end of the "extends" list');
    t.end();
});

test('putout: plugin-eslint: move-putout-to-end-in-extends: transform', (t) => {
    t.transform('json');
    t.end();
});

