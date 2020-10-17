'use strict';

const test = require('@putout/test')(__dirname, {
    putout: require('..'),
});

test('plugin-webpack: transform', (t) => {
    t.transform('loader');
    t.end();
});

