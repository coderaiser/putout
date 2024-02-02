'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-js-to-json', plugin],
    ],
});

test('@putout/plugin-filesystem: convert-js-to-json: report', (t) => {
    t.reportWithOptions('convert-js-to-json', `Convert '*.js' to '*.json'`, {
        filename: 'package.js',
    });
    t.end();
});

test('@putout/plugin-filesystem: convert-js-to-json: transform', (t) => {
    t.transformWithOptions('convert-js-to-json', {
        filename: 'package.js',
    });
    t.end();
});

test('@putout/plugin-filesystem: convert-js-to-json: transform: cjs', (t) => {
    t.transformWithOptions('cjs', {
        filename: 'package.cjs',
    });
    t.end();
});
