'use strict';

const test = require('@putout/test')(__dirname, {
    postcss: require('..'),
});

test('plugin-postcss: transform: replace-plugin-with-creator', (t) => {
    t.transform('export');
    t.end();
});

