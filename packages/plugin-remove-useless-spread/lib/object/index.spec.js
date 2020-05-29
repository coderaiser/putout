'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-spread/object': require('.'),
});

test('plugin-remove-useless-spread: report', (t) => {
    t.report('object', 'Useless spread should be avoided');
    t.end();
});

test('plugin-remove-useless-spread: transform: object', (t) => {
    t.transform('object');
    t.end();
});

