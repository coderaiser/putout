'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-array-constructor': require('..'),
});

test('plugin-remove-useless-array-constructor: report', (t) => {
    t.report('array', 'Array constructor should be avoided');
    t.end();
});

test('plugin-remove-useless-array-constructor: transform', (t) => {
    t.transform('array');
    t.end();
});

