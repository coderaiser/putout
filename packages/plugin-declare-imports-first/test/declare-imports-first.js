'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    'declaration-imports-first': plugin,
});

test('plugin-declaration-imports-first: report', (t) => {
    t.report('declaration', `Declare imports first`);
    t.end();
});

test('plugin-declaration-imports-first: transform', (t) => {
    t.transform('declaration');
    t.end();
});

