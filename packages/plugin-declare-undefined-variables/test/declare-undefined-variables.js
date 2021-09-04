'use strict';

const test = require('@putout/test')(__dirname, {
    'declare-undefined-variables': require('..'),
});

test('putout: plugin: declare-undefined-variables: report: assign', (t) => {
    t.report('assign', `Declare 'assign'`);
    t.end();
});

test('putout: plugin: declare-undefined-variables: report: readable', (t) => {
    t.report('readable', `Declare 'Readable'`);
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: join', (t) => {
    t.transform('join');
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: readable', (t) => {
    t.transform('readable');
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: try-catch', (t) => {
    t.transform('try-catch');
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: try-to-catch', (t) => {
    t.transform('try-to-catch');
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: read-file', (t) => {
    t.transform('read-file');
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: mock-import', (t) => {
    t.transform('mock-import');
    t.end();
});

test('putout: plugin: declare-undefined-variables: report: montag', (t) => {
    t.report('montag', `Declare 'montag'`);
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: montag', (t) => {
    t.transform('montag');
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: assign: dismiss', (t) => {
    t.noTransformWithOptions('assign', {
        dismiss: ['assign', 'stringify'],
    });
    t.end();
});

test('putout: plugin: declare-undefined-variables: transform: parse', (t) => {
    t.transformWithOptions('parse', {
        dismiss: ['assign', 'stringify'],
    });
    
    t.end();
});

test('putout: plugin: declare-undefined-variables: no report after transform: join', (t) => {
    t.noReportAfterTransform('join');
    t.end();
});

test('putout: plugin: declare-undefined-variables: no report after transform: assign', (t) => {
    t.noReportAfterTransform('assign');
    t.end();
});

