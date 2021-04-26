'use strict';

const test = require('@putout/test')(__dirname, {
    tape: require('..'),
});

test('plugin-test: report', (t) => {
    t.report('equal', '"result" should be before "expected"');
    t.end();
});

test('plugin-test: transform', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-test: transform: tape', (t) => {
    t.transform('tape');
    t.end();
});

test('plugin-test: transform: tape: throws', (t) => {
    t.transform('throws');
    t.end();
});

test('plugin-test: transform: tape: does-not-throw', (t) => {
    t.transform('does-not-throw');
    t.end();
});

test('plugin-test: transform: tape: expand try-catch arguments', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-test: transform: tape: apply stub operator', (t) => {
    t.transform('called-with');
    t.end();
});

test('plugin-test: transform: tape: convert calledWith to calledWithNoArgs', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-test: transform: tape: convert-emitter-to-promise', (t) => {
    t.transform('emitter');
    t.end();
});

test('plugin-test: transform: tape: declare-stub', (t) => {
    t.transform('declare-stub');
    t.end();
});

test('plugin-test: transform: tape: convert-ok-to-match', (t) => {
    t.transform('convert-ok-to-match');
    t.end();
});

test('plugin-test: transform: tape: convert-equal-to-not-ok', (t) => {
    t.transform('convert-equal-to-not-ok');
    t.end();
});

