'use strict';

const {createTest} = require('@putout/test');

const montag = require('montag');
const tape = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['tape', tape],
    ],
});

test('plugin-tape: report: equal', (t) => {
    t.report('equal', '"result" should be before "expected"');
    t.end();
});

test('plugin-tape: transform: equal', (t) => {
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

test('plugin-tape: transform: called-with', (t) => {
    t.transform('called-with');
    t.end();
});

test('plugin-tape: transform: apply-stub', (t) => {
    t.transform('apply-stub');
    t.end();
});

test('plugin-tape: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-tape: transform: convert-called-with-no-args-to-called-with', (t) => {
    t.transform('convert-called-with-no-args-to-called-with');
    t.end();
});

test('plugin-tape: transform: emitter', (t) => {
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

test('plugin-tape: transform: convert-equal-to-deep-equal', (t) => {
    t.transform('convert-equal-to-deep-equal');
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

test('plugin-tape: transform: convert-called-with-args', (t) => {
    t.transform('convert-called-with-args');
    t.end();
});

test('plugin-tape: transform: add-args', (t) => {
    t.transform('add-args');
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
        import {stub} from 'supertape';
        
        const a = stub().withName('b');
    
    `);
    t.end();
});

test('plugin-tape: transform: declare-test', (t) => {
    t.transform('declare-test');
    t.end();
});

test('plugin-tape: transform: remove-only', (t) => {
    t.transform('remove-only');
    t.end();
});

test('plugin-tape: transform: remove-skip', (t) => {
    t.transform('remove-skip');
    t.end();
});

test('plugin-tape: transform: remove-stop-all', (t) => {
    t.transform('remove-stop-all');
    t.end();
});

test('plugin-tape: transform: add-await-to-re-import', (t) => {
    t.transform('add-await-to-re-import');
    t.end();
});

test('plugin-tape: transform: apply-destructuring', (t) => {
    t.transform('apply-destructuring');
    t.end();
});

test('plugin-tape: transform: jest', (t) => {
    t.transform('jest');
    t.end();
});

test('plugin-tape: transform: convert-mock-require-to-mock-import', (t) => {
    t.transform('convert-mock-require-to-mock-import');
    t.end();
});

test('plugin-tape: transform: convert-equals-to-equal', (t) => {
    t.transform('convert-equals-to-equal');
    t.end();
});

test('plugin-tape: transform: add-node-prefix-to-mock-require', (t) => {
    t.transform('add-node-prefix-to-mock-require');
    t.end();
});
