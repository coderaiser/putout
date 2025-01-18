'use strict';

const {createTest} = require('@putout/test');
const convertPromisifyToFsPromises = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-promisify-to-fs-promises', convertPromisifyToFsPromises],
    ],
});

test('plugin-convert-fs-to-promises: report: fs', (t) => {
    t.report('fs', 'fs.promises should be used instead of fs');
    t.end();
});

test('plugin-convert-fs-to-promises: transform: fs', (t) => {
    t.transform('fs');
    t.end();
});

test('plugin-convert-fs-to-promises: no transform: no-promises', (t) => {
    t.noTransform('no-promises');
    t.end();
});
