'use strict';

const test = require('@putout/test')(__dirname, {
    'putout-config/convert-boolean-to-string': require('.'),
});

test('plugin-putout-config: convert-boolean-to-string: report', (t) => {
    t.report('bool', 'String should be used instead of Boolean');
    t.end();
});

test('plugin-putout-config: convert-boolean-to-string: transform', (t) => {
    t.transform('bool');
    t.end();
});

