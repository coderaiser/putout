'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['printer/apply-breakline', plugin],
    ],
});

test('plugin-printer: apply-breakline: report', (t) => {
    t.report('apply-breakline', `breakline = newline + indent`);
    t.end();
});

test('plugin-printer: apply-breakline: transform', (t) => {
    t.transform('apply-breakline');
    t.end();
});

test('plugin-printer: apply-breakline: transform: indent', (t) => {
    t.transform('indent');
    t.end();
});

test('plugin-printer: apply-breakline: transform: write', (t) => {
    t.transform('write');
    t.end();
});
