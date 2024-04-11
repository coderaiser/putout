'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['eslint/declare', declare],
    ],
});

test('plugin-eslint: declare: report', (t) => {
    t.report('safe-align', `Declare 'safeAlign', it referenced but not defined`);
    t.end();
});

test('plugin-eslint: declare: transform: compare', (t) => {
    t.transform('safe-align');
    t.end();
});
