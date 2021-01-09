'use strict';

const test = require('@putout/test')(__dirname, {
    nodejs: require('..'),
});

test('cloudcmd: convert-fs-promises: transform', (t) => {
    t.transform('fs');
    t.end();
});

test('cloudcmd: convert-promisify-to-fs-promises: transform', (t) => {
    t.transform('promisify');
    t.end();
});

