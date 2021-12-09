'use strict';

const travis = require('..');

const test = require('@putout/test')(__dirname, {
    travis,
});

test('plugin-travis: transform', (t) => {
    t.transform('travis');
    t.end();
});

test('plugin-travis: transform: disable npm cache', (t) => {
    t.transform('cache');
    t.end();
});

