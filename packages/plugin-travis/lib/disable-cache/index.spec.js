'use strict';

const test = require('@putout/test')(__dirname, {
    'travis/disable-npm-cache': require('.'),
});

test('plugin-travis: disable-npm-cache: report', (t) => {
    t.report('travis', '"cache" field should exist in travis');
    t.end();
});

test('plugin-travis: disable-npm-cache: transform', (t) => {
    t.transform('travis');
    t.end();
});

test('plugin-travis: disable-npm-cache: no transform: cache exists', (t) => {
    t.noTransform('cache-exists');
    t.end();
});

