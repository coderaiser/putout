'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/apply-async-formatter', convert],
    ],
});

test('plugin-tape: apply-async-formatter: report: formatter', (t) => {
    t.report('formatter', 'Use Async API to test Formatter');
    t.end();
});

test('plugin-tape: formatter', (t) => {
    t.transform('formatter');
    t.end();
});
