'use strict';

const {createTest} = require('@putout/test');
const nodejs = require('..');

const test = createTest(__dirname, {
    nodejs,
});

test('cloudcmd: convert-fs-promises: transform', (t) => {
    t.transform('fs');
    t.end();
});

test('cloudcmd: convert-promisify-to-fs-promises: transform', (t) => {
    t.transform('promisify');
    t.end();
});

