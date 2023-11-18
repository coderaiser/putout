'use strict';

const {createTest} = require('@putout/test');
const nodejs = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'nodejs/cjs-file': 'on',
    },
    plugins: [
        ['nodejs', nodejs],
    ],
});

test('plugin-nodejs: cjs-file: report', (t) => {
    t.report('cjs-file', `Use 'CommonJS' instead of 'ESM'`);
    t.end();
});

test('plugin-nodejs: cjs-file: transform: export', (t) => {
    t.transform('cjs-file');
    t.end();
});
