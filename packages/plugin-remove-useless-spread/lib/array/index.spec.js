'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-spread/array': require('.'),
});

test('plugin-remove-useless-spread: array: report', (t) => {
    t.report('for-of', 'Useless spread should be avoided');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: array', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-remove-useless-spread: array: transform: call', (t) => {
    t.transform('call');
    t.end();
});

