'use strict';

const {createTest} = require('@putout/test');
const addPush = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/add-traverse-args', addPush],
    ],
});

test('plugin-putout: add-traverse-args: report', (t) => {
    t.report('push', `Add 'push' argument to 'traverse'`);
    t.end();
});

test('plugin-putout: add-traverse-args: transform', (t) => {
    t.transform('push');
    t.end();
});

test('plugin-putout: add-traverse-args: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('plugin-putout: add-traverse-args: no report: exists', (t) => {
    t.noReport('exists');
    t.end();
});

test('plugin-putout: add-traverse-args: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-putout: add-traverse-args: transform: referenced', (t) => {
    t.transform('referenced');
    t.end();
});

test('plugin-putout: add-traverse-args: transform: add-store', (t) => {
    t.transform('add-store');
    t.end();
});

test('plugin-putout: add-traverse-args: transform: add-path-store', (t) => {
    t.transform('add-path-store');
    t.end();
});
