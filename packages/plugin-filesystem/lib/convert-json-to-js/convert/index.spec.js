'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert', plugin],
    ],
});

test('@putout/plugin-filesystem: convert: report: convert-json-to-js', (t) => {
    t.report('convert-json-to-js', `Convert '*.json' to '*.js'`);
    t.end();
});

test('@putout/plugin-filesystem: convert: transform: convert-json-to-js', (t) => {
    t.transform('convert-json-to-js');
    t.end();
});
