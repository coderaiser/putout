'use strict';

const {createTest} = require('@putout/test');
const disableNpmCache = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['travis/disable-npm-cache', disableNpmCache],
    ],
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
