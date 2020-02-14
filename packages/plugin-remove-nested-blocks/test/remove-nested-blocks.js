'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-nested-blocks': require('..'),
});

test('plugin-remove-nested-blocks: report', (t) => {
    t.report('for-of', 'Nested blocks should not be used');
    t.end();
});

test('plugin-remove-nested-blocks: transform', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-remove-nested-blocks: transform: switch: no vars', (t) => {
    t.transform('switch-no-vars');
    t.end();
});

test('plugin-remove-nested-blocks: transform: switch', (t) => {
    t.noTransform('switch');
    t.end();
});
