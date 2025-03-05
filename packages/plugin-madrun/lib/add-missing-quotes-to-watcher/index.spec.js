'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['add-missing-quotes-to-watcher', plugin],
    ],
});

test('madrun: add-missing-quotes-to-watcher: report', (t) => {
    t.report('add-missing-quotes-to-watcher', `Add missing quotes to watcher`);
    t.end();
});

test('madrun: add-missing-quotes-to-watcher: transform', (t) => {
    t.transform('add-missing-quotes-to-watcher');
    t.end();
});

test('madrun: add-missing-quotes-to-watcher: no report: c8', (t) => {
    t.noReport('c8');
    t.end();
});
