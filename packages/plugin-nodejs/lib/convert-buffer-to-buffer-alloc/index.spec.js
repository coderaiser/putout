'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    'nodejs/convert-buffer-to-buffer-alloc': convert,
});

test('nodejs: convert-buffer-to-buffer-alloc: report', (t) => {
    t.report('convert-buffer-to-buffer-alloc', `Use 'Buffer.alloc()' or 'Buffer.from()' instead of 'Buffer()' and 'new Buffer()'`);
    t.end();
});

test('nodejs: convert-buffer-to-buffer-alloc: transform', (t) => {
    t.transform('convert-buffer-to-buffer-alloc');
    t.end();
});

