'use strict';

const {createTest} = require('@putout/test');
const entriesN = require('./index.js');

const test = createTest(__dirname, {
    'convert-for-to-for-of/entries-n': entriesN,
});

test('plugin-convert-for-to-for-of: entries-n: report', (t) => {
    t.report('entries-n', `Use 'for...of' instead of 'for'`);
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: entries-n', (t) => {
    t.transform('entries-n');
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: used-n', (t) => {
    t.noTransform('used-n');
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: not-declered-n', (t) => {
    t.noReport('not-declered-n');
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: not block', (t) => {
    t.noTransformCode(`
        const n = a.length;
        for (let i = 0; i < n; i++) log();
    `);
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: not assign', (t) => {
    t.noTransformCode(`
        const n = a.length;
        for (let i = 0; i < n; i++) {};
    `);
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: no n', (t) => {
    t.noTransformCode(`
        console.log();
        for (let i = 0; i < n; i++) {
            const element = elements[i];
        };
    `);
    t.end();
});

test('plugin-convert-for-to-for-of: entries-n: transform: no references i', (t) => {
    t.noTransformCode(`
        console.log();
        for (let i = 0; a < n; a++) {
            const element = elements[a];
        };
    `);
    t.end();
});
