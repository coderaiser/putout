'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/check-replace-code': require('.'),
});

test('plugin-putout: check-replace-code: report', (t) => {
    t.report('replace', 'Looks like template values not linked: ["__b"] ["__a"]');
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

test('plugin-putout: check-replace-code: no transform: condition', (t) => {
    t.report('condition', 'transform mismatch: "if (__a = __b) __body" -> "if (__a === __b) __body" !== "if (_temp === _temp2)\n    {};"');
    t.end();
});

