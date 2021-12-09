'use strict';

const removeStopAll = require('.');

const test = require('@putout/test')(__dirname, {
    'tape/remove-stop-all': removeStopAll,
});

test('plugin-tape: remove-stop-all: report', (t) => {
    t.report('stop-all', `Remove 'stopAll()' when you not calling 'reImport()'`);
    t.end();
});

test('plugin-tape: remove-stop-all: transform', (t) => {
    t.transform('stop-all');
    t.end();
});

test('plugin-tape: remove-stop-all: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: re-import', (t) => {
    t.noTransform('re-import');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: re-require', (t) => {
    t.noTransform('re-require');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: mock-require', (t) => {
    t.noTransform('mock-require');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: mock-import', (t) => {
    t.noTransform('mock-import');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: trace-import', (t) => {
    t.noTransform('trace-import');
    t.end();
});
