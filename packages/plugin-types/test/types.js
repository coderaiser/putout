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
