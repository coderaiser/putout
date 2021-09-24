'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/apply-with-name': require('.'),
});

test('plugin-tape: apply-with-name: report', (t) => {
    t.report('called-before', `'stub().withName()' should be used`);
    t.end();
});

test('plugin-tape: apply-with-name: transform: called-before', (t) => {
    t.transform('called-before');
    t.end();
});

test('plugin-tape: apply-with-name: transform: called-after', (t) => {
    t.transform('called-after');
    t.end();
});

test('plugin-tape: apply-with-name: transform: called-in-order', (t) => {
    t.transform('called-in-order');
    t.end();
});

test('plugin-tape: apply-with-name: no transform: returns', (t) => {
    t.noTransform('returns');
    t.end();
});

test('plugin-tape: apply-with-name: no transform: not-declared', (t) => {
    t.transform('not-declared');
    t.end();
});

