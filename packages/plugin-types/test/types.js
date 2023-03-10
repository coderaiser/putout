'use strict';

const {createTest} = require('@putout/test');
const types = require('..');

const test = createTest(__dirname, {
    types,
});

test('putout: plugin: types: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});

test('putout: plugin: types: declare: transform: convert-typeof-to-is-type', (t) => {
    t.transform('convert-typeof-to-is-type');
    t.end();
});

test('putout: plugin: types: declare: transform: remove-useless-conversion', (t) => {
    t.transform('remove-useless-conversion');
    t.end();
});

test('putout: plugin: types: declare: transform: remove-double-negations', (t) => {
    t.transform('remove-double-negations');
    t.end();
});

test('putout: plugin: types: declare: transform: remove-useless-typeof', (t) => {
    t.transform('remove-useless-typeof');
    t.end();
});

test('putout: plugin: types: declare: transform: apply-is-array', (t) => {
    t.transform('apply-is-array');
    t.end();
});

