'use strict';

const test = require('@putout/test')(__dirname, {
    putout: require('.'),
});

test('plugin-putout-config: transform', (t) => {
    t.report('bool', 'String should be used instead of Boolean');
    t.end();
});

test('plugin-putout-config: transform', (t) => {
    t.transform('bool');
    t.end();
});

