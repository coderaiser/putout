'use strict';

const montag = require('montag');
const test = require('@putout/test')(__dirname, {
    tape: require('..'),
});

test('plugin-tape: report', (t) => {
    t.report('equal', '"result" should be before "expected"');
    t.end();
});

test('plugin-tape: transform', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-tape: transform: tape', (t) => {
    t.transform('tape');
    t.end();
});

test('plugin-tape: transform: throws', (t) => {
    t.transform('throws');
    t.end();
});

test('plugin-tape: transform: does-not-throw', (t) => {
    t.transform('does-not-throw');
    t.end();
});

test('plugin-tape: transform: expand try-catch arguments', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-tape: transform: apply stub operator', (t) => {
    t.transform('called-with');
    t.end();
});

test('plugin-tape: transform: convert calledWith to calledWithNoArgs', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-tape: transform: convert calledWithNoArgs to calledWith', (t) => {
    t.transform('convert-called-with-no-args-to-called-with');
    t.end();
});

test('plugin-tape: transform: convert-emitter-to-promise', (t) => {
    t.transform('emitter');
    t.end();
});

test('plugin-tape: transform: declare-stub', (t) => {
    t.transform('declare-stub');
    t.end();
});

test('plugin-tape: transform: convert-ok-to-match', (t) => {
    t.transform('convert-ok-to-match');
    t.end();
});

test('plugin-tape: transform: convert-equal-to-not-ok', (t) => {
    t.transform('convert-equal-to-not-ok');
    t.end();
});

test('plugin-tape: transform: convert-equal-to-ok', (t) => {
    t.transform('convert-equal-to-ok');
    t.end();
});

test('plugin-tape: transform: convert-match-regexp-to-string', (t) => {
    t.transform('convert-match-regexp-to-string');
    t.end();
});

test('plugin-tape: transform: convert-ok-to-called-with', (t) => {
    t.transform('convert-ok-to-called-with');
    t.end();
});

test('plugin-tape: transform: convert-called-with-args', (t) => {
    t.transform('convert-called-with-args');
    t.end();
});

test('plugin-tape: transform: declare-t', (t) => {
    t.transform('declare-t');
    t.end();
});

test('plugin-tape: transform: remove-default-messages', (t) => {
    t.transform('remove-default-messages');
    t.end();
});

test('plugin-tape: transform: remove-useless-not-called-args', (t) => {
    t.transform('remove-useless-not-called-args');
    t.end();
});

test('plugin-tape: transform: apply-with-name', (t) => {
    t.transform('apply-with-name');
    t.end();
});

test('plugin-tape: transform: add-t-end', (t) => {
    t.transform('add-t-end');
    t.end();
});

test('plugin-tape: transform: add-stop-all', (t) => {
    t.transform('add-stop-all');
    t.end();
});

test('plugin-tape: transform: remove-useless-t-end', (t) => {
    t.transform('remove-useless-t-end');
    t.end();
});

test('plugin-tape: transform: convert-equal-to-called-once', (t) => {
    t.transform('convert-equal-to-called-once');
    t.end();
});

test('plugin-tape: transform: convert-deep-equal-to-equal', (t) => {
    t.transform('convert-deep-equal-to-equal');
    t.end();
});

test('plugin-tape: transform: sync-with-name', (t) => {
    t.transformCode(`const a = stub().withName('b');`, montag`
        const {
          test,
          stub
        } = require('supertape');
        
        const a = stub().withName('a');
    `);
    t.end();
});

test('plugin-tape: transform: declare-test', (t) => {
    t.transform('declare-test');
    t.end();
});
