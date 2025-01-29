'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-from-break', plugin],
    ],
});

test('putout: convert-from-break: report', (t) => {
    t.report('convert-from-break', `Use 'return' instead of 'break'`);
    t.end();
});

test('putout: convert-from-break: transform', (t) => {
    t.transform('convert-from-break');
    t.end();
});

test('putout: convert-from-break: no report: switch', (t) => {
    t.noReport('switch');
    t.end();
});
