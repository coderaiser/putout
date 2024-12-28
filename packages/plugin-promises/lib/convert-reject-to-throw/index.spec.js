'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['promises/convert-reject-to-throw', convert],
    ],
});

test('plugin-promises: convert-reject-to-throw: report', (t) => {
    t.report('reject', 'Reject is useless in async functions, use throw instead');
    t.end();
});

test('plugin-promises: convert-reject-to-throw: transform', (t) => {
    t.transform('reject');
    t.end();
});

test('plugin-promises: convert-reject-to-throw: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-promises: convert-reject-to-throw: transform: await', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-promises: convert-reject-to-throw: no transform: not-async', (t) => {
    t.noTransform('not-async');
    t.end();
});

test('plugin-promises: convert-reject-to-throw: no report: not async', (t) => {
    t.noReport('not-async');
    t.end();
});

test('plugin-promises: convert-reject-to-throw: no transform: not-fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-promises: convert-reject-to-throw: no transform: no arg', (t) => {
    t.noTransform('no-arg');
    t.end();
});

test('plugin-promises: convert-reject-to-throw: no report: no arg', (t) => {
    t.noReport('no-arg');
    t.end();
});
