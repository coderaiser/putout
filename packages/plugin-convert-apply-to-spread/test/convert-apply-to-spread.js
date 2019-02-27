'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-apply-to-spread': require('..'),
});

test('plugin-convert-apply-to-spread: report', (t) => {
    t.reportCode('a.apply(a, b)', '"spread" should be used instead of "apply"');
    t.end();
});

test('plugin-convert-apply-to-spread: transform', (t) => {
    t.transformCode('a.apply(a, b)', 'a(...b)');
    t.end();
});

test('plugin-convert-apply-to-spread: transform: no apply', (t) => {
    const code = 'a(a, b)';
    
    t.transformCode(code, code);
    t.end();
});

test('plugin-convert-apply-to-spread: transform: call', (t) => {
    const code = 'a.call(a, b)';
    
    t.transformCode(code, code);
    t.end();
});

