'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-duplicates-from-logical-expressions': require('..'),
});

test('plugin-remove-duplicates-from-logical-expressions: report', (t) => {
    t.report('logical', 'Duplicates should be avoided in logical expressions');
    t.end();
});

test('plugin-remove-duplicates-from-logical-expressions: transform: logical', (t) => {
    t.transform('logical');
    t.end();
});

