'use strict';

const postcss = require('..');

const test = require('@putout/test')(__dirname, {
    postcss,
});

test('plugin-postcss: transform: replace-plugin-with-creator', (t) => {
    t.transform('export');
    t.end();
});

