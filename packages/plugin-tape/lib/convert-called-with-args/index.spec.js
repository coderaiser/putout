'use strict';

const {createTest} = require('@putout/test');
const convertCalledWithArguments = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/convert-called-with-arguments', convertCalledWithArguments],
    ],
});

test('plugin-tape: convert-called-with-arguments: report: args', (t) => {
    t.report('args', `Use an array as args to 'calledWith()'`);
    t.end();
});

test('plugin-tape: convert-called-with-arguments: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('plugin-tape: convert-called-with-arguments: no transform: identifier', (t) => {
    t.noTransform('identifier');
    t.end();
});

test('plugin-tape: convert-called-with-arguments: no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});
