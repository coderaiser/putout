'use strict';

const {createTest} = require('@putout/test');
const nodejs = require('..');

const test = createTest(__dirname, {
    rules: {
        'nodejs/rename-file-cjs-to-js': 'on',
    },
    plugins: [
        ['nodejs', nodejs],
    ],
});

test('plugin-nodejs: rename-file-cjs-to-js: report', (t) => {
    t.report('rename-file-cjs-to-js', `Rename '/lib/hello.cjs' to '/lib/hello.js'`);
    t.end();
});

test('plugin-nodejs: rename-file-cjs-to-js: transform', (t) => {
    t.transform('rename-file-cjs-to-js');
    t.end();
});
