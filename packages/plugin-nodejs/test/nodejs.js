'use strict';

const {createTest} = require('@putout/test');
const nodejs = require('..');

const test = createTest(__dirname, {
    nodejs,
});

test('putout: plugin: nodejs: convert-fs-promises: transform', (t) => {
    t.transform('fs');
    t.end();
});

test('putout: plugin: nodejs: convert-promisify-to-fs-promises: transform', (t) => {
    t.transform('promisify');
    t.end();
});

test('putout: plugin: nodejs: transform: convert-dirname-to-url', (t) => {
    t.transform('convert-dirname-to-url');
    t.end();
});

test('putout: plugin: nodejs: transform: convert-url-to-dirname', (t) => {
    t.transform('convert-url-to-dirname');
    t.end();
});

test('putout: plugin: nodejs: transform: remove-process-exit', (t) => {
    t.transform('remove-process-exit');
    t.end();
});

test('putout: plugin: nodejs: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('putout: plugin: nodejs: transform: convert-top-level-return', (t) => {
    t.transform('convert-top-level-return', '\n');
    t.end();
});

test('putout: plugin: nodejs: no transform: type', (t) => {
    t.noTransformCode('type()');
    t.end();
});
