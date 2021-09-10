'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/apply-processors-destructuring': require('.'),
});

test('plugin-putout: apply-processors-destructuring: report', (t) => {
    t.report('process', 'Test operator should be destructured');
    t.end();
});

test('plugin-putout: apply-processors-destructuring: transform', (t) => {
    t.transform('process');
    t.end();
});

test('plugin-putout: apply-processors-destructuring: transform: compare places', (t) => {
    t.transform('compare-places');
    t.end();
});

