'use strict';

const test = require('@putout/test')(__dirname, {
    'nodejs/convert-fs-promises': require('.'),
});

test('nodejs: convert-fs-promises: report', (t) => {
    t.report('fs', '"fs/promises" should be used instead of "fs.promises"');
    t.end();
});

test('nodejs: convert-fs-promises: transform', (t) => {
    t.transform('fs');
    t.end();
});

