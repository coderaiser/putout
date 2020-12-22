'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'tape/apply-stub-operator': convert,
});

test('plugin-tape: apply-stub-operator: report', (t) => {
    t.report('called-with', 'Stub operator should be used');
    t.end();
});

test('plugin-tape: apply-stub-operator', (t) => {
    t.transform('called-with');
    t.end();
});

