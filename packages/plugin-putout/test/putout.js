'use strict';

const test = require('@putout/test')(__dirname, {
    putout: require('..'),
});

test('plugin-putout: transform', (t) => {
    t.transform('no-transform-code');
    t.end();
});

test('plugin-putout: transform: shorten putout exports', (t) => {
    t.transform('shorten-putout-exports');
    t.end();
});

