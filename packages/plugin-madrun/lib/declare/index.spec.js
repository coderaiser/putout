'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['madrun/declare', declare],
    ],
});

test('plugin-madrun: declare: report: cut-env', (t) => {
    t.report('cut-env', `Declare 'cutEnv', it referenced but not defined`);
    t.end();
});

test('plugin-madrun: declare: transform: cut-env', (t) => {
    t.transform('cut-env');
    t.end();
});
