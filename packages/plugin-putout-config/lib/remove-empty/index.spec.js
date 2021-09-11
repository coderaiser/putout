'use strict';

const test = require('@putout/test')(__dirname, {
    'putout-config/remove-empty': require('.'),
});

test('plugin-putout-config: remove-empty: report', (t) => {
    t.report('empty', 'Avoid empty property values');
    t.end();
});

test('plugin-putout-config: remove-empty: transform', (t) => {
    t.transform('empty');
    t.end();
});

test('plugin-putout-config: remove-empty: no transform: plugin options', (t) => {
    t.noTransform('plugin-options');
    t.end();
});

