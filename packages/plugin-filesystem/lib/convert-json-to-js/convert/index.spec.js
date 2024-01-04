'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert', plugin],
    ],
});

test('@putout/plugin-filesystem: convert: report', (t) => {
    t.report('convert-json-to-js', `Convert '*.json' to '*.js'`);
    t.end();
});

test('@putout/plugin-filesystem: convert: transform', (t) => {
    t.transform('convert-json-to-js');
    t.end();
});
