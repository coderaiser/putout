'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['tape/apply-async-formatter', convert],
    ],
});

test('plugin-tape: apply-async-formatter: report', (t) => {
    t.report('formatter', 'Use Async API to test Formatter');
    t.end();
});

test('plugin-tape: apply-async-formatter', (t) => {
    t.transform('formatter');
    t.end();
});
