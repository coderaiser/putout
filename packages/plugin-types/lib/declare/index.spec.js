'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['declare', declare],
    ],
});

test('putout: plugin: types: declare: report', (t) => {
    t.report('declare', `Declare 'isString', it referenced but not defined`);
    t.end();
});

test('putout: plugin: types: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('putout: plugin: types: declare: empty-string', (t) => {
    t.transform('empty-string');
    t.end();
});

test('putout: plugin: types: declare: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('putout: plugin: types: declare: is-bigint', (t) => {
    t.transform('is-bigint');
    t.end();
});

test('putout: plugin: types: declare: is-symbol', (t) => {
    t.transform('is-symbol');
    t.end();
});

test('putout: plugin: types: declare: is-array', (t) => {
    t.transform('is-array');
    t.end();
});

test('putout: plugin: types: declare: is-empty-array', (t) => {
    t.transform('is-empty-array');
    t.end();
});

test('putout: plugin: types: declare: is-error', (t) => {
    t.transform('is-error');
    t.end();
});
