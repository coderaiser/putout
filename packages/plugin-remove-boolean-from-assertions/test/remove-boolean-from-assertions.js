'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-boolean-from-assertions': require('..'),
});

test('plugin-remove-boolean-from-assertions: report', (t) => {
    t.report('assertions', 'Boolean should be avoided in assertions');
    t.end();
});

test('plugin-remove-boolean-from-assertions: transform', (t) => {
    t.transform('assertions');
    t.end();
});

