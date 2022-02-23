'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const montag = require('montag');

const test = createTest(__dirname, {
    'nodejs/declare': declare,
});

test('putout: plugin: nodejs: declare: report: readable-simple', (t) => {
    t.report('readable-simple', `Declare 'Readable'`);
    t.end();
});

test('putout: plugin: nodejs: declare: transform: join', (t) => {
    t.transform('join');
    t.end();
});

test('putout: plugin: nodejs: declare: transform: readable', (t) => {
    t.transform('readable');
    t.end();
});

test('putout: plugin: nodejs: declare: transform: readable-simple', (t) => {
    t.transform('readable-simple');
    t.end();
});

test('putout: plugin: nodejs: declare: transform: read-file', (t) => {
    t.transform('read-file');
    t.end();
});

test('putout: plugin: nodejs: declare: no report after transform: join', (t) => {
    t.noReportAfterTransform('join');
    t.end();
});

test('putout: plugin: nodejs: declare: node-js-fs', (t) => {
    t.transform('node-js-fs');
    t.end();
});

test('putout: plugin: nodejs: declare: node-js-zlib', (t) => {
    t.transform('node-js-zlib');
    t.end();
});

test('putout: plugin: nodejs: declare: module', (t) => {
    t.transform('module');
    t.end();
});

test('putout: plugin: nodejs: declare: os', (t) => {
    t.transform('os');
    t.end();
});

test('putout: plugin: nodejs: declare: child_process', (t) => {
    t.transform('child_process');
    t.end();
});

test('putout: plugin: nodejs: declare: stream', (t) => {
    t.transform('stream');
    t.end();
});

test('putout: plugin: nodejs: declare: nodejs: url', (t) => {
    t.transformCode(`pathToFileURL(path);`, montag`
        import {pathToFileURL} from 'url';
        pathToFileURL(path);
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: nodejs: util', (t) => {
    t.transformCode(`promisify(fn);`, montag`
        import {promisify} from 'util';
        promisify(fn);
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: node-js: process', (t) => {
    t.transformCode(`cwd();`, montag`
        import {cwd} from 'process';
        cwd();
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: node-js: no transform', (t) => {
    t.noTransformCode(`promises.filter();`);
    t.end();
});

