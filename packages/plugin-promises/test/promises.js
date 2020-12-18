'use strict';

const test = require('@putout/test')(__dirname, {
    promises: require('..'),
});

test('plugin-promises: transform: report', (t) => {
    t.report('await', '"return await promise()" should be used instead of "return promise()"');
    t.end();
});

test('plugin-promises: transform: export', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-promises: transform: add missing await', (t) => {
    t.transform('async');
    t.end();
});

