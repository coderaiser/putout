'use strict';

const {createTest} = require('@putout/test');
const nodejs = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'nodejs/mjs-file': 'on',
    },
    plugins: [
        ['nodejs', nodejs],
    ],
});

test('plugin-nodejs: mjs-file: report', (t) => {
    t.report('mjs-file', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('plugin-nodejs: mjs-file: transform: export', (t) => {
    t.transform('mjs-file');
    t.end();
});
