'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/convert-called-with-to-called-with-no-args', convert],
    ],
});

test('plugin-tape: convert-called-with-to-called-with-no-args: report: no-args', (t) => {
    t.report('no-args', `Use 'calledWithNoArgs()' when arguments are absent`);
    t.end();
});

test('plugin-tape: convert-called-with-to-called-with-no-args: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('plugin-tape: convert-called-with-to-called-with-no-args: empty-array', (t) => {
    t.transform('empty-array');
    t.end();
});

test('plugin-tape: convert-called-with-to-called-with-no-args: message', (t) => {
    t.transform('message');
    t.end();
});
