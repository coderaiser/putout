'use strict';

const {createTest} = require('@putout/test');
const switchExpectedWithResult = require('.');

const test = createTest(__dirname, {
    'tape/switch-expected-with-result': switchExpectedWithResult,
});

test('plugin-tape: switch-expected-with-result: report', (t) => {
    t.report('equal', '"result" should be before "expected"');
    t.end();
});

test('plugin-tape: switch-expected-with-result: transform', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-tape: switch-expected-with-result: transform: deep equal', (t) => {
    t.transform('deep-equal');
    t.end();
});

test('plugin-tape: switch-expected-with-result: transform: expected', (t) => {
    t.transform('expected');
    t.end();
});

