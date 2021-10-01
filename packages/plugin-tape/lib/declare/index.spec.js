'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/declare': require('.'),
});

test('plugin-tape: declare: report', (t) => {
    t.report('test', `Declare 'test'`);
    t.end();
});

test('plugin-tape: declare: transform', (t) => {
    t.transform('test');
    t.end();
});

test('plugin-tape: declare: transform: stub', (t) => {
    t.transform('stub');
    t.end();
});

test('plugin-tape: declare: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

