'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/shorten-putout-exports': require('.'),
});

test('plugin-putout: convert-putout-exports: report', (t) => {
    t.report('shorten-imports', 'Shorten require path to putout exports');
    t.end();
});

test('plugin-putout: transform', (t) => {
    t.transform('shorten-imports');
    t.end();
});

test('plugin-putout: transform: parse options', (t) => {
    t.transform('parse-options');
    t.end();
});
