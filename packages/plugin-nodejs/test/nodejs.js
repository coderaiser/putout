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

test('cloudcmd: transform: convert-dirname-to-url', (t) => {
    t.transform('convert-dirname-to-url');
    t.end();
});

test('cloudcmd: transform: convert-url-to-dirname', (t) => {
    t.transform('convert-url-to-dirname');
    t.end();
});

test('cloudcmd: transform: remove-process-exit', (t) => {
    t.transform('remove-process-exit');
    t.end();
});

test('cloudcmd: transform: convert-top-level-return', (t) => {
    t.transform('convert-top-level-return', '\n');
    t.end();
});

