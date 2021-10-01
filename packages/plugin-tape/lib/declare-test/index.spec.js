'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/declare-test': require('.'),
});

test('plugin-tape: declare-test: report', (t) => {
    t.report('test', `Declare 'test'`);
    t.end();
});

test('plugin-tape: declare-test: transform', (t) => {
    t.transform('test');
    t.end();
});
test('plugin-tape: declare-test: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

