'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['tape/apply-stub-operator', convert],
    ],
});

test('plugin-tape: apply-stub-operator: report', (t) => {
    t.report('called-with', 'Use Stub operator');
    t.end();
});

test('plugin-tape: apply-stub-operator', (t) => {
    t.transform('called-with');
    t.end();
});

test('plugin-tape: apply-stub-operator: called-with-no-args', (t) => {
    t.transform('called-with-no-args');
    t.end();
});
