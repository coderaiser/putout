'use strict';

const {createTest} = require('@putout/test');
const checkReplaceCode = require('.');

const test = createTest(__dirname, {
    'putout/check-replace-code': checkReplaceCode,
});

test('plugin-putout: check-replace-code: report', (t) => {
    t.report('replace', '☝️ Looks like template values not linked: ["__a"] -> ["__b"]');
    t.end();
});

test('plugin-putout: check-replace-code: no transform', (t) => {
    t.noTransform('valid');
    t.end();
});

test('plugin-putout: check-replace-code: no transform: replace', (t) => {
    t.noTransform('replace');
    t.end();
});

test('plugin-putout: check-replace-code: report: computed', (t) => {
    t.report('computed', '☝️ Looks like template values not linked: ["__a"] -> ["__b"]');
    t.end();
});

test('plugin-putout: check-replace-code: report: computed: not found', (t) => {
    t.report('computed-not-found', `Replace key cannot be computed: 'BODIES.function'`);
    t.end();
});

test('plugin-putout: check-replace-code: no report: computed invalid', (t) => {
    t.report('computed-invalid', `Replace key cannot be computed: 'NOT_OBJECT_EXPRESSION.boolean'`);
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
    t.report('invalid', 'Missing initializer in const declaration. (1:9)');
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

test('plugin-putout: check-replace-code: no report: string literal', (t) => {
    t.noReport('string-literal');
    t.end();
});

test('plugin-putout: check-replace-code: no report: match', (t) => {
    t.noReport('match');
    t.end();
});

test('plugin-putout: check-replace-code: no report: template', (t) => {
    t.noReport('template');
    t.end();
});

test('plugin-putout: check-replace-code: no report: literal-vars', (t) => {
    t.noReport('literal-vars');
    t.end();
});

test('plugin-putout: check-replace-code: report: mismatch', (t) => {
    t.report('mismatch', 'transform mismatch: "if (__a = __b) __body" -> "if (__a === "__b") __body" !== "if (_temp === _temp2)\n  {}"');
    t.end();
});

