'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/convert-query-loader-to-use': require('.'),
});

test('plugin-putout: report', (t) => {
    t.report('query', `"use" should be used instead of query in loaders`);
    t.end();
});

test('plugin-putout: transform', (t) => {
    t.transform('query');
    t.end();
});

