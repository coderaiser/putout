'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-traverse-to-scan', plugin],
    ],
});

test('packages: convert-traverse-to-scan: report', (t) => {
    t.report('convert-traverse-to-scan', `Use Scanner instead of Traverser`);
    t.end();
});

test('packages: convert-traverse-to-scan: transform', (t) => {
    t.transform('convert-traverse-to-scan');
    t.end();
});

test('packages: convert-traverse-to-scan: transform: path-used-in-report', (t) => {
    t.transform('path-used-in-report');
    t.end();
});

test('packages: convert-traverse-to-scan: no report: no-filystem', (t) => {
    t.noReport('no-filesystem');
    t.end();
});

test('packages: convert-traverse-to-scan: transform: push-path', (t) => {
    t.transform('push-path');
    t.end();
});

test('packages: convert-traverse-to-scan: no report: nested', (t) => {
    t.noReport('nested');
    t.end();
});

test('packages: convert-traverse-to-scan: transform: not-scan', (t) => {
    t.transform('not-scan');
    t.end();
});

test('packages: convert-traverse-to-scan: transform: fix-path', (t) => {
    t.transform('fix-path');
    t.end();
});

test('packages: convert-traverse-to-scan: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('packages: convert-traverse-to-scan: transform: no-push-call', (t) => {
    t.transform('no-push-call');
    t.end();
});

test('packages: convert-traverse-to-scan: transform: push-inside-scan', (t) => {
    t.transform('push-inside-scan');
    t.end();
});

test('packages: convert-traverse-to-scan: transform: map', (t) => {
    t.transform('map');
    t.end();
});

test('packages: convert-traverse-to-scan: transform: create-traverse', (t) => {
    t.transform('create-traverse');
    t.end();
});
