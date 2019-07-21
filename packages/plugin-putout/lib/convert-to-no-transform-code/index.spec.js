'use strict';

const test = require('@putout/test')(__dirname, {
    test: require('.'),
});

test('plugin-madrun: transform', (t) => {
    t.transform('no-transform-code');
    t.end();
});

test('plugin-madrun: transform: not same', (t) => {
    t.noTransform('not-same');
    t.end();
});

test('plugin-madrun: no transform: literal', (t) => {
    t.noTransform('literal');
    t.end();
});
