'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/add-missing-argument': require('.'),
});

test('plugin-putout: add-missing-argument: report', (t) => {
    t.report('compare-places', 'Argument "comparePlaces" is missing');
    t.end();
});

test('plugin-putout: add-missing-argument: transform', (t) => {
    t.transform('compare-places');
    t.end();
});

test('plugin-putout: add-missing-argument: no transform: has binding', (t) => {
    t.noTransform('has-binding');
    t.end();
});

test('plugin-putout: add-missing-argument: no transform: not-test', (t) => {
    t.noTransform('not-test');
    t.end();
});

