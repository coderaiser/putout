'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-expression-to-params', plugin],
    ],
});

test('putout: convert-expression-to-params: report', (t) => {
    t.report('convert-expression-to-params', `Use 'params' instead of 'expression'`);
    t.end();
});

test('putout: convert-expression-to-params: transform', (t) => {
    t.transform('convert-expression-to-params');
    t.end();
});

test('putout: convert-expression-to-params: no report: no-args', (t) => {
    t.noReport('no-args');
    t.end();
});
