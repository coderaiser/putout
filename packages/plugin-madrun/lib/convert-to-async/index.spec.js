'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-to-async': require('.'),
});

test('madrun: convert to async: report', (t) => {
    t.report('run', 'Async functions should be used');
    t.end();
});

test('madrun: convert to async: transform', (t) => {
    t.transform('run');
    t.end();
});

test('madrun: convert to async: transform: two', (t) => {
    t.transform('two');
    t.end();
});

test('madrun: convert to async: transform: three', (t) => {
    t.transform('three');
    t.end();
});

test('madrun: convert to async: not transform: await', (t) => {
    t.noTransform('await');
    t.end();
});

test('madrun: convert to async: not transform: call', (t) => {
    t.noTransform('call');
    t.end();
});
