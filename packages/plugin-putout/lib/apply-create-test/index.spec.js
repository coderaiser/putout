'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/apply-create-test', convert],
    ],
});

test('plugin-tape: apply-create-test: report: test', (t) => {
    t.report('test', `Apply 'createTest'`);
    t.end();
});

test('plugin-tape: test', (t) => {
    t.transform('test');
    t.end();
});
