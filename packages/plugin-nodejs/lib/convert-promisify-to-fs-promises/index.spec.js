'use strict';

const convertPromisifyToFsPromises = require('.');

const test = require('@putout/test')(__dirname, {
    'convert-promisify-to-fs-promises': convertPromisifyToFsPromises,
});

test('plugin-convert-fs-to-promises: report', (t) => {
    t.report('fs', 'fs.promises should be used instead of fs');
    t.end();
});

test('plugin-convert-fs-to-promises: transform', (t) => {
    t.transform('fs');
    t.end();
});

test('plugin-convert-fs-to-promises: no transform: no promises', (t) => {
    t.noTransform('no-promises');
    t.end();
});
