'use strict';

const test = require('@putout/test')(__dirname, {
    'apply-utility-types': require('..'),
});

test('plugin-apply-utility-types: transform: report: mapped-types', (t) => {
    t.report('mapped-types', 'Utility types should be applied');
    t.end();
});

test('plugin-apply-utility-types: transform: mapped-types', (t) => {
    t.transform('mapped-types');
    t.end();
});

