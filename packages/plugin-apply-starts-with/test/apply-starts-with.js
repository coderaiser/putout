'use strict';

const {createTest} = require('@putout/test');
const applyArrayAt = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-starts-with', applyArrayAt],
    ],
});

test('plugin-apply-starts-with: transform: report', (t) => {
    t.report('apply-starts-with', `Use '.startsWith()' instead of '.indexOf()'`);
    t.end();
});

test('plugin-apply-starts-with: transform: object', (t) => {
    t.transform('apply-starts-with');
    t.end();
});

test('plugin-apply-starts-with: transform: upper-scope', (t) => {
    t.transform('upper-scope');
    t.end();
});

test('plugin-apply-starts-with: no transform: not-assign', (t) => {
    t.noTransform('not-assign');
    t.end();
});

test('plugin-apply-starts-with: no transform: not-declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});
