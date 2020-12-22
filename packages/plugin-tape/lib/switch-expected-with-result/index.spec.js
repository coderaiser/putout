'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/switch-expected-with-result': require('.'),
});

test('plugin-test: report', (t) => {
    t.report('equal', '"result" should be before "expected"');
    t.end();
});

test('plugin-test: transform', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-test: transform: deep equal', (t) => {
    t.transform('deep-equal');
    t.end();
});

test('plugin-test: transform: expected', (t) => {
    t.transform('expected');
    t.end();
});

