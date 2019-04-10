'use strict';

const test = require('@putout/test')(__dirname, {
    'fix-illogical-expressions': require('..'),
});

test('plugin-fix-illogical-expressions: report', (t) => {
    t.report('couple-values', 'identifier checked for having a couple values in the same time');
    t.end();
});

test('plugin-fix-illogical-expressions: transform', (t) => {
    t.transform('couple-values');
    t.end();
});

