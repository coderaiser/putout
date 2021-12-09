'use strict';

const removeUselessTypeof = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-useless-typeof': removeUselessTypeof,
});

test('plugin-remove-useless-typeof: report', (t) => {
    t.report('typeof-typeof', 'Useless typeof should be avoided');
    t.end();
});

test('plugin-remove-useless-typeof: transform', (t) => {
    t.transform('typeof-typeof');
    t.end();
});

