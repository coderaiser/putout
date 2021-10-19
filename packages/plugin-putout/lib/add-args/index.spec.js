'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/add-args': require('.'),
});

test('plugin-putout: add-args: report', (t) => {
    t.report('compare-places', 'Argument "comparePlaces" is missing');
    t.end();
});

test('plugin-putout: add-args: transform', (t) => {
    t.transform('compare-places');
    t.end();
});

test('plugin-putout: add-args: no transform: has binding', (t) => {
    t.noTransform('has-binding');
    t.end();
});

test('plugin-putout: add-args: no transform: not-test', (t) => {
    t.noTransform('not-test');
    t.end();
});

