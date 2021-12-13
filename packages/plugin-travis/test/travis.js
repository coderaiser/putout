'use strict';

const {createTest} = require('@putout/test');
const travis = require('..');

const test = createTest(__dirname, {
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

