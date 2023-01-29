'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'webpack/apply-externals': plugin,
});

test('plugin-webpack: apply-externals: report', (t) => {
    t.report('apply-externals', `Use 'externals({context, request}, callback){...}'`);
    t.end();
});

test('plugin-webpack: apply-externals: transform', (t) => {
    t.transform('apply-externals');
    t.end();
});

test('plugin-webpack: apply-externals: no transform', (t) => {
    t.noTransform('two-args');
    t.end();
});

