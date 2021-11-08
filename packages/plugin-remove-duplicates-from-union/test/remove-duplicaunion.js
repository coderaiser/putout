'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-duplicates-from-union': require('..'),
});

test('plugin-remove-duplicates-from-union: report', (t) => {
    t.report('union', 'Avoid using duplicates in Union');
    t.end();
});

test('plugin-remove-duplicates-from-union: transform: union', (t) => {
    t.transform('union');
    t.end();
});

