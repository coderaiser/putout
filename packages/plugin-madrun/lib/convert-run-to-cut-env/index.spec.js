'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['madrun/convert-run-to-cut-env', convert],
    ],
});

test('madrun: convert-run-to-cut-env: report: run', (t) => {
    t.report('run', `Use 'cutEnv()' instead of 'run()'`);
    t.end();
});

test('madrun: convert-run-to-cut-env: transform: run', (t) => {
    t.transform('run');
    t.end();
});

test('madrun: convert-run-to-cut-env: transform: no-env', (t) => {
    t.transform('no-env');
    t.end();
});

test('madrun: convert-run-to-cut-env: no transform: no export default', (t) => {
    t.noTransformCode(`export const hello = 'world';\nrun('hello');\n`);
    t.end();
});

test('madrun: convert-run-to-cut-env: no transform: no-property', (t) => {
    t.noTransform('no-property');
    t.end();
});

test('madrun: convert-run-to-cut-env: no transform: env', (t) => {
    t.noTransform('env');
    t.end();
});
