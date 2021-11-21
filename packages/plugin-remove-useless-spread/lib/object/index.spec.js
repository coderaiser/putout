'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-spread/object': require('.'),
});

test('plugin-remove-useless-spread: object: report', (t) => {
    t.report('object', 'Useless spread should be avoided');
    t.end();
});

test('plugin-remove-useless-spread: object: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-remove-useless-spread: object: no transform: same', (t) => {
    t.noTransform('same');
    t.end();
});

test('plugin-remove-useless-spread: object: no transform: logical', (t) => {
    t.noTransform('logical');
    t.end();
});

