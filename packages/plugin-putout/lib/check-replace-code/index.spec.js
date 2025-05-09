import {createTest} from '@putout/test';
import * as checkReplaceCode from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/check-replace-code', checkReplaceCode],
    ],
});

test('plugin-putout: check-replace-code: report: replace', (t) => {
    t.report('replace', '☝️ Looks like template values not linked: ["__a"] -> ["__b"]');
    t.end();
});

test('plugin-putout: check-replace-code: no transform: valid', (t) => {
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

test('plugin-putout: check-replace-code: report: computed: computed-not-found', (t) => {
    t.report('computed-not-found', `Replace key cannot be computed: 'BODIES.function'`);
    t.end();
});

test('plugin-putout: check-replace-code: report: computed-invalid', (t) => {
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

test('plugin-putout: check-replace-code: no report: string-literal', (t) => {
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

test('plugin-putout: check-replace-code: no report: identifier', (t) => {
    t.noReport('identifier');
    t.end();
});

test('plugin-putout: check-replace-code: report: mismatch', (t) => {
    t.report('mismatch', 'transform mismatch: "if (__a = __b) __body" -> "if (__a === "__b") __body" !== "if (_temp === _temp2) {}"');
    t.end();
});

test('plugin-putout: check-replace-code: no report: json: json-object', (t) => {
    t.noReport('json-object');
    t.end();
});

test('plugin-putout: check-replace-code: report: json', (t) => {
    t.report('json', 'transform mismatch: "export default __array" -> "__json" !== "export default __array;"');
    t.end();
});

test('plugin-putout: check-replace-code: report: esm', (t) => {
    t.report('esm', `transform mismatch: "const __a = reatomComponent(__b)" -> "const __a = reatomComponent(__b, "__a")" !== "const _temp = reatomComponent(_temp2, _temp);"`);
    t.end();
});

test('plugin-putout: check-replace-code: report: __json: json-left', (t) => {
    t.report('json-left', '☝️ Looks like template values not linked: ["__object"] -> ["__array"]');
    t.end();
});

test('plugin-putout: check-replace-code: no report after transform: after-transform: once', (t) => {
    t.noReportAfterTransform('after-transform');
    t.end();
});

test('plugin-putout: check-replace-code: no report: json-left: json-left-object', (t) => {
    t.noReport('json-left-object');
    t.end();
});

test('plugin-putout: check-replace-code: no report: object-pattern', (t) => {
    t.noReport('object-pattern');
    t.end();
});

test('plugin-putout: check-replace-code: no report: class-body', (t) => {
    t.noReport('class-body');
    t.end();
});

test('plugin-putout: check-replace-code: no report: return', (t) => {
    t.noReport('return');
    t.end();
});

test('plugin-putout: check-replace-code: no report: return-commonjs', (t) => {
    t.noReport('return-commonjs');
    t.end();
});
