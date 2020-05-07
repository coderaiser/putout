'use strict';

const splitDestructuring = require('..');

const test = require('@putout/test')(__dirname, {
    'split-destructuring': splitDestructuring,
});

test('plugin-split-destructuring: report', (t) => {
    t.report('destr', 'Avoid nested destructuring');
    t.end();
});

test('plugin-split-destructuring: transform', (t) => {
    t.transform('destr');
    t.end();
});

