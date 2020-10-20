'use strict';

const test = require('@putout/test')(__dirname, {
    putout: require('..'),
});

test('plugin-postcss: transform', (t) => {
    t.transform('export');
    t.end();
});

