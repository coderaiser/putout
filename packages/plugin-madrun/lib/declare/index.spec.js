'use strict';

const declare = require('.');

const test = require('@putout/test')(__dirname, {
    'madrun/declare': declare,
});

test('plugin-madrun: declare: report', (t) => {
    t.report('cut-env', `Declare 'cutEnv'`);
    t.end();
});

test('plugin-madrun: declare: transform', (t) => {
    t.transform('cut-env');
    t.end();
});

