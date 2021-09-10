'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/check-replace-code': require('.'),
});

test('plugin-putout: check-replace-code: report', (t) => {
    t.report('replace', '☝️  Looks like template values not linked: ["__b"] ["__a"]');
    t.end();
});

test('plugin-putout: check-replace-code: transform', (t) => {
    t.noTransform('valid');
    t.end();
});

test('plugin-putout: check-replace-code: no transform: replace', (t) => {
    t.noTransform('replace');
    t.end();
});

test('plugin-putout: check-replace-code: no transform: replace: destr', (t) => {
    t.noTransform('destr');
    t.end();
});

test('plugin-putout: check-replace-code: no report: fn', (t) => {
    t.noReport('fn');
    t.end();
});

test('plugin-putout: check-replace-code: no report: array-argument', (t) => {
    t.noReport('array-argument');
    t.end();
});

test('plugin-putout: check-replace-code: no report: array-assignment', (t) => {
    t.noReport('array-assignment');
    t.end();
});

test('plugin-putout: check-replace-code: no report: member', (t) => {
    t.noReport('member');
    t.end();
});

test('plugin-putout: check-replace-code: report: invalid', (t) => {
    t.report('invalid', `Unexpected token (1:10)`);
    t.end();
});

test('plugin-putout: check-replace-code: no report: condition', (t) => {
    t.noReport('condition');
    t.end();
});

test('plugin-putout: check-replace-code: no report: double-semi', (t) => {
    t.noReport('double-semi');
    t.end();
});

test('plugin-putout: check-replace-code: no report: empty', (t) => {
    t.noReport('empty');
    t.end();
});

test('plugin-putout: check-replace-code: no report: array', (t) => {
    t.noReport('array');
    t.end();
});

test('plugin-putout: check-replace-code: no report: object', (t) => {
    t.noReport('object');
    t.end();
});

test('plugin-putout: check-replace-code: no report: typescript', (t) => {
    t.noReport('typescript');
    t.end();
});

test('plugin-putout: check-replace-code: report: mismatch', (t) => {
    t.report('mismatch', 'transform mismatch: "if (__a = __b) __body" -> "if (__a === "__b") __body" !== "if (_temp === _temp2)\n  {};"');
    t.end();
});

