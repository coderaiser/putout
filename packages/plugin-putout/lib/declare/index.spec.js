'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/declare': require('.'),
});

test('plugin-putout: declare: report', (t) => {
    t.report('compare', `Declare 'compare'`);
    t.end();
});

test('plugin-putout: declare: transform: compare', (t) => {
    t.transform('compare');
    t.end();
});

test('plugin-putout: declare: transform: compare: second time', (t) => {
    t.transform('compare');
    t.end();
});

test('plugin-putout: declare: transform: contains', (t) => {
    t.transform('contains');
    t.end();
});

test('plugin-putout: declare: transform: traverse', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: declare: transform: operator', (t) => {
    t.transform('operator');
    t.end();
});

test('plugin-putout: declare: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-putout: declare: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('plugin-putout: declare: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-putout: declare: transform: get-template-values', (t) => {
    t.transform('get-template-values');
    t.end();
});

test('plugin-putout: declare: transform: regexp', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-putout: declare: transform: add-argument', (t) => {
    t.transform('add-argument');
    t.end();
});
