'use strict';

const {createTest} = require('@putout/test');
const shortenPutoutExports = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/shorten-putout-exports', shortenPutoutExports],
    ],
});

test('plugin-putout: shorten-putout-exports: report: shorten-imports', (t) => {
    t.report('shorten-imports', 'Shorten require path to putout exports');
    t.end();
});

test('plugin-putout: shorten-putout-exports: transform: shorten-imports', (t) => {
    t.transform('shorten-imports');
    t.end();
});

test('plugin-putout: shorten-putout-exports: transform: parse-options', (t) => {
    t.transform('parse-options');
    t.end();
});
