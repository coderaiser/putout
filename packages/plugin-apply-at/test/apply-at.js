'use strict';

const {createTest} = require('@putout/test');
const applyArrayAt = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-at', applyArrayAt],
    ],
});

test('plugin-apply-at: report', (t) => {
    t.report('array', `Use 'Array.at()'`);
    t.end();
});

test('plugin-apply-at: transform: object', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-apply-at: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-apply-at: no report: not-couple', (t) => {
    t.noReport('not-couple');
    t.end();
});

test('plugin-apply-at: no transform: assignment', (t) => {
    t.noTransform('assignment');
    t.end();
});
