'use strict';

const {createTest} = require('@putout/test');
const nodejs = require('..');

const test = createTest(__dirname, {
    rules: {
        'nodejs/convert-commonjs-to-esm': 'on',
        'nodejs/convert-esm-to-commonjs': 'off',
        'nodejs/add-node-prefix': 'off',
        'nodejs/declare': 'off',
    },
    plugins: [
        ['nodejs', nodejs],
    ],
});

test('plugin-nodejs: convert-commonjs-to-esm: report: convert-commonjs-to-esm-exports', (t) => {
    t.report('convert-commonjs-to-esm-exports', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('plugin-nodejs: convert-commonjs-to-esm: transform: convert-commonjs-to-esm-exports', (t) => {
    t.transform('convert-commonjs-to-esm-exports');
    t.end();
});

test('plugin-nodejs: convert-commonjs-to-esm: transform: export: convert-commonjs-to-esm-exports-string', (t) => {
    t.transform('convert-commonjs-to-esm-exports-string');
    t.end();
});

test('plugin-nodejs: convert-commonjs-to-esm: transform: convert-commonjs-to-esm-commons', (t) => {
    t.transform('convert-commonjs-to-esm-commons');
    t.end();
});
