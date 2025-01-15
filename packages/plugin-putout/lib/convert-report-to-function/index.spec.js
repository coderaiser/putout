'use strict';

const {createTest} = require('@putout/test');
const convertFindToTraverse = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-report-to-function', convertFindToTraverse],
    ],
});

test('plugin-putout: convert report to function: report: convert-report-to-function', (t) => {
    t.report('convert-report-to-function', `Typeof 'report' should be a 'function'`);
    t.end();
});

test('plugin-putout: convert report to function: transform: convert-report-to-function', (t) => {
    t.transform('convert-report-to-function');
    t.end();
});

test('plugin-putout: convert report to function: transform: template', (t) => {
    t.transform('template');
    t.end();
});
