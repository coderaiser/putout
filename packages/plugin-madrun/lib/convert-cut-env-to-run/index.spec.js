'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    'madrun/convert-cut-env-to-run': convert,
});

test('madrun: convert-cut-env-to-run: report', (t) => {
    t.report('cut-env', `Use 'cutEnv()' instead of 'run()'`);
    t.end();
});

test('madrun: convert-cut-env-to-run: transform', (t) => {
    t.transform('cut-env');
    t.end();
});

test('madrun: convert-cut-env-to-run: no transform: no export default', (t) => {
    t.noTransformCode(`export const hello = 'world'; cutEnv('hello')`);
    t.end();
});

test('madrun: convert-cut-env-to-run: no transform: no property', (t) => {
    t.noTransform('no-property');
    t.end();
});

