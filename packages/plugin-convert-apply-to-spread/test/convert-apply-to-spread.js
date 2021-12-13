'use strict';

const {createTest} = require('@putout/test');
const convertApplyToSpread = require('..');

const test = createTest(__dirname, {
    'convert-apply-to-spread': convertApplyToSpread,
});

test('plugin-convert-apply-to-spread: report', (t) => {
    t.report('apply', 'Spread should be used instead of "apply"');
    t.end();
});

test('plugin-convert-apply-to-spread: transform', (t) => {
    t.transform('apply');
    t.end();
});

test('plugin-convert-apply-to-spread: transform: no apply', (t) => {
    const code = 'a(a, b)';

    t.noTransformCode(code);
    t.end();
});

test('plugin-convert-apply-to-spread: transform: call', (t) => {
    const code = 'a.call(a, b)';

    t.noTransformCode(code);
    t.end();
});

test('plugin-convert-apply-to-spread: transform: context', (t) => {
    const code = 'a.apply(b, c)';

    t.noTransformCode(code);
    t.end();
});

test('plugin-convert-apply-to-spread: transform: this', (t) => {
    t.transform('this');
    t.end();
});

test('plugin-convert-apply-to-spread: transform: member expression', (t) => {
    t.transform('member-expression');
    t.end();
});

test('plugin-convert-apply-to-spread: transform: null', (t) => {
    t.transform('null');
    t.end();
});

test('plugin-convert-apply-to-spread: transform: prototype', (t) => {
    t.transform('prototype');
    t.end();
});

