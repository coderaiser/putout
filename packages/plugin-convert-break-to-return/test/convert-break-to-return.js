'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['convert-break-to-return', plugin],
    ],
});

test('putout: convert-break-to-return: report', (t) => {
    t.report('convert-break-to-return', `Use 'return' instead of 'break'`);
    t.end();
});

test('putout: convert-break-to-return: transform', (t) => {
    t.transform('convert-break-to-return');
    t.end();
});

test('putout: convert-break-to-return: no report: switch', (t) => {
    t.noReport('switch');
    t.end();
});
