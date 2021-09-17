'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/declare-t': require('.'),
});

test('plugin-tape: declare-t: report', (t) => {
    t.report('t', 'Argument "t" is missing');
    t.end();
});

test('plugin-tape: declare-t: transform', (t) => {
    t.transform('t');
    t.end();
});

