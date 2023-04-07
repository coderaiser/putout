'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['tape/apply-create-test', convert],
    ],
});

test('plugin-tape: apply-create-test: report', (t) => {
    t.report('test', `Apply 'createTest'`);
    t.end();
});

test('plugin-tape: apply-create-test', (t) => {
    t.transform('test');
    t.end();
});
